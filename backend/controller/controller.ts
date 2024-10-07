import { RequestHandler } from 'express';
import express, { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getcustomer = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        orders: true,
      },
    });

    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const postcustomer = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
      },
    });

    res
      .status(201)
      .json({ message: 'Customer added successfully', customer: newCustomer });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ message: 'Error adding customer', error });
  }
};

const deletecustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(customer);
  } catch (error) {
    console.error('Error deleting customers:', error);
    res.status(500).json({ error: 'Failed to deleting customers' });
  }
};

const putcustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const customer = await prisma.customer.update({
      where: {
        id: Number(id),
      },
      data: {
        name: String(name),
        email: String(email),
      },
    });
    res.json(customer); // Return the updated production record
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customers' });
  }
};

/////  order  /////
const getorder = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
      },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export default getcustomer;
postcustomer;
deletecustomer;
putcustomer;
getorder;
