import { Request, Response, NextFunction } from 'express';

export const newUservalidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { email } = req.body;

  if (!emailRegex.test(email)) {
    res.status(422).json({ error: 'Invalid email' });
    return;
  }
  next();
};
