import { Router } from 'express';
import notificationRoutes from '../modules/notification/notification.routes';
import healthRoutes from '../common/routes/health.routes';
import adminRoutes from '../modules/admin/admin.routes';

const router = Router();

router.use('/', healthRoutes);
router.use('/api/v1/notifications', notificationRoutes);
router.use('/api/v1/admin', adminRoutes);

export default router;
