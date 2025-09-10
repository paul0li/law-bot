import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import { Request, Response } from 'express';
import { createDb } from './utils/db.js';
import { router as healthRouter } from './routes/health.js';
import { router as authRouter } from './routes/auth.js';

const app = express();
app.use(cors({ origin: env.WEB_APP_ORIGIN, credentials: true }));
app.use(express.json({ limit: '5mb' }));

// DB init (ensures connection is valid on boot)
createDb();

app.use('/health', healthRouter);
app.use('/auth', authRouter);

app.get('/', (_req: Request, res: Response) => {
  res.json({ ok: true, service: 'law-bot-api' });
});

const port = Number(env.API_PORT || 4000);
app.listen(port, () => {
  console.log(`[law-bot-api] listening on :${port}`);
});
