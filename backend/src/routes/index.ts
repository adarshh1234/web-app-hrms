import { Router } from 'express';
import notificationRoutes from '../modules/notification/notification.routes';
import healthRoutes from '../common/routes/health.routes';

const router = Router();

router.use('/', healthRoutes);
router.use('/api/v1/notifications', notificationRoutes);

export default router;
