import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './common/config/env';
import { requestIdMiddleware } from './common/middlewares/requestId';
import { authMiddleware } from './common/middlewares/authMiddleware';
import { errorHandler } from './common/middlewares/errorHandler';
import { notFoundHandler } from './common/middlewares/notFound';
import routes from './routes/index';

export const createApp = (): Express => {
  const app = express();

  // CORS must be registered BEFORE helmet so it can set Access-Control-Allow-Origin headers.
  // When CORS_ORIGIN is '*' we reflect the request Origin (required when credentials:true).
  const allowedOrigins =
    config.CORS_ORIGIN === '*'
      ? (origin: string | undefined, cb: (err: Error | null, allow?: boolean) => void) => cb(null, true)
      : config.CORS_ORIGIN.split(',').map((o) => o.trim());

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    })
  );

  // Security & Header Middlewares — disable crossOriginResourcePolicy so helmet doesn't block
  // cross-origin fetches that our explicit cors() config already permits.
  app.use(helmet({ crossOriginResourcePolicy: false }));

  // Request parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
