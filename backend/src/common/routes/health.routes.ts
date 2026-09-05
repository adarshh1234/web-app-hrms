import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1;

  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    database: {
      isConnected: dbStatus,
      connectionState: mongoose.connection.readyState,
    },
  });
});

export default router;
