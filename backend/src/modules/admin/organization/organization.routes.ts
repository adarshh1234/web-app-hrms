import { Router } from 'express';
import { organizationController } from './organization.controller';

const router = Router();

router.route('/')
  .get(organizationController.getOrganization)
  .put(organizationController.updateOrganization);

router.route('/locations')
  .post(organizationController.addLocation);

router.route('/locations/:id')
  .delete(organizationController.removeLocation);

export default router;
