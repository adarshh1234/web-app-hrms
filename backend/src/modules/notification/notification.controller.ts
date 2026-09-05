import { Request, Response, NextFunction } from 'express';
import { notificationService, NotificationService } from './notification.service';
import { sendResponse } from '../../common/utils/apiResponse';
import {
  createNotificationSchema,
  updateNotificationSchema,
  queryNotificationSchema,
  notificationIdParamSchema,
} from './notification.validator';

export class NotificationController {
  constructor(private service: NotificationService = notificationService) {}

  createNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = createNotificationSchema.parse(req.body);
      const notification = await this.service.createNotification(validatedData, req.user);
      sendResponse({
        res,
        statusCode: 201,
        message: 'Notification created successfully',
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  };

  sendNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = notificationIdParamSchema.parse(req.params);
      const notification = await this.service.sendNotification(id);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Notification sent successfully',
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  };

  getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = queryNotificationSchema.parse(req.query);
      const result = await this.service.getNotifications(query);
      sendResponse({
        res,
        statusCode: 200,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  getNotificationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = notificationIdParamSchema.parse(req.params);
      const notification = await this.service.getNotificationById(id);
      sendResponse({
        res,
        statusCode: 200,
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  };

  updateNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = notificationIdParamSchema.parse(req.params);
      const updateData = updateNotificationSchema.parse(req.body);
      const updated = await this.service.updateNotification(id, updateData);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Notification updated successfully',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = notificationIdParamSchema.parse(req.params);
      await this.service.deleteNotification(id);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Notification draft deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export const notificationController = new NotificationController();
