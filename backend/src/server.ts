import { app } from './app';
import { config } from './common/config/env';
import { connectDB, disconnectDB } from './common/config/db';

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(config.PORT, '0.0.0.0', () => {
      console.log(`[Server] Notification Service running on port ${config.PORT} in [${config.NODE_ENV}] mode`);
    });

    const gracefulShutdown = async (signal: string) => {
      console.log(`[Server] Received ${signal}. Starting graceful shutdown...`);
      server.close(async () => {
        console.log('[Server] HTTP server closed.');
        await disconnectDB();
        process.exit(0);
      });
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  } catch (error) {
    console.error('[Server] Fatal startup error:', error);
    process.exit(1);
  }
};

startServer();
