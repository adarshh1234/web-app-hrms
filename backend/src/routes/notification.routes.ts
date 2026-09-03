import { Router } from 'express';
import { notificationController } from '../controllers/notification.controller';
import { sendRateLimiter } from '../middlewares/rateLimiter';


const router = Router();

router
  .route('/')
  .post(notificationController.createNotification)
  .get(notificationController.getNotifications);

router
  .route('/:id/send')
  .post(sendRateLimiter, notificationController.sendNotification);

router
  .route('/:id')
  .get(notificationController.getNotificationById)
  .patch(notificationController.updateNotification)
  .delete(notificationController.deleteNotification);

export default router;
