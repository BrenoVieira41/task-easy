import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if(!authorization) return res.status(401).send('Faça login novamente.');

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;

    return next();
  } catch (error) {
    return res.status(401).send('Faça login novamente.');
  }
}
