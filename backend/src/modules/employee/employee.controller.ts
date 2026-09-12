import { Request, Response, NextFunction } from 'express';
import { EmployeeService, employeeService } from './employee.service';
import { sendResponse } from '../../common/utils/apiResponse';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  queryEmployeeSchema,
  employeeIdParamSchema,
} from './employee.validator';

export class EmployeeController {
  constructor(private service: EmployeeService = employeeService) {}

  createEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = createEmployeeSchema.parse(req.body);
      const employee = await this.service.createEmployee(validatedData);
      sendResponse({
        res,
        statusCode: 201,
        message: 'Employee created successfully',
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  };

  getEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = queryEmployeeSchema.parse(req.query);
      const result = await this.service.getEmployees(query);
      sendResponse({
        res,
        statusCode: 200,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = employeeIdParamSchema.parse(req.params);
      const employee = await this.service.getEmployeeById(id);
      sendResponse({
        res,
        statusCode: 200,
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = employeeIdParamSchema.parse(req.params);
      const validatedData = updateEmployeeSchema.parse(req.body);
      const updated = await this.service.updateEmployee(id, validatedData);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Employee updated successfully',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = employeeIdParamSchema.parse(req.params);
      await this.service.deleteEmployee(id);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Employee deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export const employeeController = new EmployeeController();
