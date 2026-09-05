import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { config } from '../config/env';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors: any = undefined;

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';
    errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
  }
  // Handle Mongoose CastError (invalid ObjectId)
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for field '${err.path}'`;
  }
  // Handle Mongoose ValidationError
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  if (statusCode === 500 && config.NODE_ENV !== 'test') {
    console.error(`[Error] Request ID: ${req.requestId} - `, err);
  }

  return res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || (statusCode === 400 ? 'VALIDATION_ERROR' : statusCode === 404 ? 'NOT_FOUND' : 'SERVER_ERROR'),
      message,
      ...(errors && { details: errors }),
      ...(config.NODE_ENV === 'development' && { stack: err.stack }),
    },
    requestId: req.requestId,
  });
};
