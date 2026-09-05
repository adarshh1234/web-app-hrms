import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  // Extract user info from headers if provided, or supply clean fallback user context
  const userId = (req.headers['x-user-id'] as string) || 'user-1';
  const userName = (req.headers['x-user-name'] as string) || 'System Admin';

  req.user = {
    id: userId,
    name: userName,
  };

  next();
};
