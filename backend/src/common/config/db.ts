import mongoose from 'mongoose';
import { config } from './env';

export const connectDB = async (uri?: string): Promise<typeof mongoose> => {
  const dbUri = uri || config.MONGODB_URI;
  try {
    const conn = await mongoose.connect(dbUri);
    console.log(`[MongoDB] Connected: ${conn.connection.host}:${conn.connection.port}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection failed to ${dbUri}:`, error);
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('[MongoDB] Disconnected');
  }
};
