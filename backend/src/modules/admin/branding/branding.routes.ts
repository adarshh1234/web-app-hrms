import { Router } from 'express';
import { brandingController } from './branding.controller';

const router = Router();

router.route('/')
  .get(brandingController.getBranding)
  .put(brandingController.updateBranding);

export default router;
