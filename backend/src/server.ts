import { app } from './app';
import { config } from './config/env';
import { connectDB, disconnectDB } from './config/db';


const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(config.PORT, () => {
      console.log(`=================================`);
      console.log(`🚀 Notification Backend Running`);
      console.log(`🔊 Port: ${config.PORT}`);
      console.log(`🌍 Environment: ${config.NODE_ENV}`);
      console.log(`=================================`);
    });

    const shutdown = async (signal: string) => {
      console.log(`\n[Server] ${signal} signal received. Initiating graceful shutdown...`);
      server.close(async () => {
        console.log('[Server] HTTP server closed');
        await disconnectDB();
        console.log('[Server] Shutdown complete. Exiting process.');
        process.exit(0);
      });

      // Force shutdown after 10s timeout
      setTimeout(() => {
        console.error('[Server] Forced shutdown due to timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('[Server] Failed to start server:', error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
