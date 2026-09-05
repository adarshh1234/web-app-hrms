import { Router } from 'express';
import { qualificationController } from './qualification.controller';

const router = Router();

router.route('/')
  .post(qualificationController.createQualification)
  .get(qualificationController.getQualifications);

router.route('/:id')
  .get(qualificationController.getQualificationById)
  .patch(qualificationController.updateQualification)
  .delete(qualificationController.deleteQualification);

export default router;
