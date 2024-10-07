import express, { NextFunction, RequestHandler } from 'express';

import Jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { error } from 'console';
const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const isAuth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const verifyToken = Jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: parseInt(verifyToken.userId) },
    });
    if (!user) res.status(403).json({ error: 'unauthorized access!' });
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ message: 'unauthorized access' });
    } else {
      res.status(401).json({ message: 'Something went Wrong!' });
    }
  }
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  if (req.user.role === 'admin') next();
  else res.status(422).json({ error: 'Protected only for admin' });
};
