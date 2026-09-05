import { Request, Response, NextFunction } from 'express';
import { userService, UserService } from './user.service';
import { sendResponse } from '../../../common/utils/apiResponse';
import {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
  queryUserSchema,
  mongoIdSchema,
} from './user.validator';

export class UserController {
  constructor(private service: UserService = userService) {}

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createUserSchema.parse(req.body);
      const user = await this.service.createUser(validated);
      sendResponse({
        res,
        statusCode: 201,
        message: 'User created successfully',
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = queryUserSchema.parse(req.query);
      const result = await this.service.getUsers(query);
      sendResponse({
        res,
        statusCode: 200,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const user = await this.service.getUserById(id);
      sendResponse({
        res,
        statusCode: 200,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const validated = updateUserSchema.parse(req.body);
      const user = await this.service.updateUser(id, validated);
      sendResponse({
        res,
        statusCode: 200,
        message: 'User updated successfully',
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  updateUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const { status } = updateUserStatusSchema.parse(req.body);
      const user = await this.service.updateUserStatus(id, status);
      sendResponse({
        res,
        statusCode: 200,
        message: `User status changed to ${status}`,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      await this.service.deleteUser(id);
      sendResponse({
        res,
        statusCode: 200,
        message: 'User deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  };
}

export const userController = new UserController();
