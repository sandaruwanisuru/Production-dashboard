import express, { NextFunction, RequestHandler } from 'express';
import { register, login, adminResponses } from '../controller/authController'; // Correct import
import { newUservalidator } from '../middleware/validate';
import { privateResponses } from '../controller/authController';
import { isAdmin, isAuth } from '../middleware/authmiddleware';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const authrouter = express.Router();

authrouter.post('/register', newUservalidator, register);
authrouter.post('/login', login);
authrouter.get('/private', isAuth, privateResponses);
authrouter.get('/admin', isAuth, isAdmin, adminResponses);
// authrouter.post('/logout', (req: Request, res: Response) => {
//     req.session.destroy(err => {
//       if (err) {
//         return res.status(500).json({ message: 'Failed to log out' });
//       }
//       res.clearCookie('connect.sid'); // Assuming cookie-based sessions
//       return res.json({ message: 'Logged out successfully' });
//     });
//   });

export default authrouter;
