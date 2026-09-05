import { Router } from 'express';
import { nationalityController } from './nationality.controller';

const router = Router();

router.route('/')
  .post(nationalityController.createNationality)
  .get(nationalityController.getNationalities);

router.route('/:id')
  .get(nationalityController.getNationalityById)
  .patch(nationalityController.updateNationality)
  .delete(nationalityController.deleteNationality);

export default router;
