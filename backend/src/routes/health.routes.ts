import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];

  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      status: states[dbState] || 'unknown',
      isConnected: dbState === 1,
    },
  });
});

export default router;
