import mongoose from 'mongoose';
import { config } from './env';

import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer | null = null;

export const connectDB = async (uri?: string): Promise<typeof mongoose> => {
  const dbUri = uri || config.MONGODB_URI;
  try {
    const conn = await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 2000 });
    console.log(`[MongoDB] Connected: ${conn.connection.host}:${conn.connection.port}`);
    return conn;
  } catch (error) {
    console.warn('[MongoDB] Direct connection failed or timed out. Initializing MongoMemoryServer fallback...');
    mongoMemoryServer = await MongoMemoryServer.create();
    const memUri = mongoMemoryServer.getUri();
    const conn = await mongoose.connect(memUri);
    console.log(`[MongoDB] Connected to MongoMemoryServer at: ${memUri}`);
    return conn;
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('[MongoDB] Disconnected');
  }
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
    console.log('[MongoDB] MongoMemoryServer stopped');
  }
};

