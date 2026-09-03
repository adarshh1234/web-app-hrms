import { Router } from 'express';
import notificationRoutes from './notification.routes';
import healthRoutes from './health.routes';


const router = Router();

router.use('/', healthRoutes);
router.use('/api/v1/notifications', notificationRoutes);

export default router;
