import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
      },
    });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error('User not found');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(201).json({ message: 'invalid Credintials' });
      return;
    }
    const token = Jwt.sign(
      { userId: user.id.toLocaleString(), role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).json({ message: 'message' });
  }
};

export const privateResponses = async (req: Request, res: Response) => {
  res.json({
    message: 'cool man you are in private',
  });
};

export const adminResponses = async (req: Request, res: Response) => {
  res.json({
    message: 'cool man you are our admin',
  });
};
