import { Router } from 'express';
import { employeeController } from './employee.controller';

const router = Router();

router
  .route('/')
  .post(employeeController.createEmployee)
  .get(employeeController.getEmployees);

router
  .route('/:id')
  .get(employeeController.getEmployeeById)
  .patch(employeeController.updateEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

export default router;
