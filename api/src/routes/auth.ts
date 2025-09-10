import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';
import { getDb } from '../utils/db.js';

export const router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) throw createHttpError(400, 'Email y contraseña requeridos');

    const db = getDb();
    const user = await db
      .selectFrom('auth.users')
      .selectAll()
      .where('email', '=', email)
      .where('is_active', '=', true)
      .executeTakeFirst();

    // MVP: password check stub (reemplazar con hash real)
    if (!user || password !== 'admin' && password !== 'user') {
      throw createHttpError(401, 'Credenciales inválidas');
    }

    const token = jwt.sign({ sub: user.id, role: user.role }, env.API_JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
});
