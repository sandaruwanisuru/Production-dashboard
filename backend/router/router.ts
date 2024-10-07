import express, { Request, Response } from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { parse } from 'path';
import getcustomer from '../controller/controller';
import postcustomer from '../controller/controller';
import deletecustomer from '../controller/controller';
import putcustomer from '../controller/controller';
import getorder from '../controller/controller';

const prisma = new PrismaClient();

const router = express.Router();

///// Customer section ////////
router.get('/customers', getcustomer);

router.post('/customers', postcustomer);

router.delete('/customers/:id', deletecustomer);

router.put('/customers/:id', putcustomer);

/////   Order section /////
router.get('/orders', getorder);

router.get('/orders/monthly', async (req: Request, res: Response) => {
  try {
    // Use MySQL-compatible syntax
    const monthlyOrderQuantities = await prisma.$queryRaw<
      { month: Date; totalQuantity: number }[]
    >`
      SELECT 
        DATE_FORMAT(createdAt, '%Y-%m-01') as month,  
        SUM(quantity) as totalQuantity
      FROM \`Order\`
      GROUP BY month
      ORDER BY month ASC;
    `;

    // Format the result to include the month name and year
    const result = monthlyOrderQuantities.map((order) => {
      const month = new Date(order.month).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
      return {
        month,
        totalQuantity: order.totalQuantity || 0,
      };
    });

    res.json(result); // Send the result as the response
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.post('/orders', async (req, res) => {
  const { customerId, quantity, size, createdAt } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        customerId: parseInt(customerId),
        quantity: parseInt(quantity),
        size,
        createdAt: new Date(createdAt),
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.get('/orders/total', async (req: Request, res: Response) => {
  try {
    const totalOrderQuantity = await prisma.order.aggregate({
      _sum: {
        quantity: true,
      },
    });

    res
      .status(200)
      .json({ totalOrderQuantity: totalOrderQuantity._sum.quantity || 0 });
  } catch (error) {
    console.error('Error fetching total order quantity:', error);
    res.status(500).json({ error: 'Failed to fetch total order quantity' });
  }
});

router.delete('/orders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(order);
  } catch (error) {
    console.error('Error deleting orders:', error);
    res.status(500).json({ error: 'Failed to deleting orders' });
  }
});

router.put('/orders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, size, createdAt } = req.body;

    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: Number(quantity),
        size: String(size),
        createdAt: new Date(createdAt),
      },
    });

    res.json(order); // Return the updated production record
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

///////   Production Section  /////
router.get('/productions', async (req: Request, res: Response) => {
  try {
    const production = await prisma.production.findMany({});
    res.json(production);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.delete('/productions/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const production = await prisma.production.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(production);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.put('/productions/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, size, producedQuantity, createdAt } = req.body;

    const production = await prisma.production.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: Number(quantity),
        size: String(size),
        producedQuantity: Number(producedQuantity),
        createdAt: new Date(createdAt),
      },
    });

    res.json(production); // Return the updated production record
  } catch (error) {
    console.error('Error updating production:', error);
    res.status(500).json({ error: 'Failed to update production' });
  }
});

router.post('/productions', async (req: Request, res: Response) => {
  const { producedQuantity, quantity, size } = req.body;

  try {
    const Newproduction = await prisma.production.create({
      data: {
        quantity: parseInt(quantity),
        size,
        producedQuantity: parseInt(producedQuantity),
      },
    });

    res.status(201).json(Newproduction);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.get('/productions/total', async (req: Request, res: Response) => {
  try {
    const totalProducedQuantity = await prisma.production.aggregate({
      _sum: {
        producedQuantity: true,
      },
    });

    res.status(200).json({
      totalProducedQuantity: totalProducedQuantity._sum.producedQuantity || 0,
    });
  } catch (error) {
    console.error('Error fetching total produced quantity:', error);
    res.status(500).json({ error: 'Failed to fetch total produced quantity' });
  }
});

export default router;
