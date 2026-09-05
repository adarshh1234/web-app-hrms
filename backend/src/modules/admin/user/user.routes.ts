import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

router.route('/')
  .post(userController.createUser)
  .get(userController.getUsers);

router.route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/:id/status')
  .patch(userController.updateUserStatus);

export default router;
