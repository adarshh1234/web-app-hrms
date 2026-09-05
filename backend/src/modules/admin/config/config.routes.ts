import { Router } from 'express';
import { configurationController } from './config.controller';

const router = Router();

router.route('/')
  .get(configurationController.getConfiguration)
  .put(configurationController.updateConfiguration);

export default router;
