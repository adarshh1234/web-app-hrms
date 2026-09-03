import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env';
import { requestIdMiddleware } from './middlewares/requestId';
import { authMiddleware } from './middlewares/authMiddleware';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFound';
import routes from './routes/index';


export const createApp = (): Express => {
  const app = express();

  // Security & Header Middlewares
  app.use(helmet());
  app.use(
    cors({
      origin: config.CORS_ORIGIN === '*' ? true : config.CORS_ORIGIN.split(','),
      credentials: true,
    })
  );

  // Request parsing
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Tracing & Logging Middlewares
  app.use(requestIdMiddleware);
  if (config.NODE_ENV !== 'test') {
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms (reqId: :req[x-request-id])'));
  }

  // Authentication Context Attachment
  app.use(authMiddleware);

  // Mount API Routes
  app.use(routes);

  // 404 Not Found Handler
  app.use(notFoundHandler);

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
};

export const app = createApp();
