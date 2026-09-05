import { Request, Response, NextFunction } from 'express';
import { nationalityService, NationalityService } from './nationality.service';
import { sendResponse } from '../../../common/utils/apiResponse';
import {
  createNationalitySchema,
  updateNationalitySchema,
  queryNationalitySchema,
  mongoIdSchema,
} from './nationality.validator';

export class NationalityController {
  constructor(private service: NationalityService = nationalityService) {}

  createNationality = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createNationalitySchema.parse(req.body);
      const item = await this.service.createNationality(validated);
      sendResponse({
        res,
        statusCode: 201,
        message: 'Nationality created successfully',
        data: item,
      });
    } catch (err) {
      next(err);
    }
  };

  getNationalities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = queryNationalitySchema.parse(req.query);
      const result = await this.service.getNationalities(query);
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

  getNationalityById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const item = await this.service.getNationalityById(id);
      sendResponse({
        res,
        statusCode: 200,
        data: item,
      });
    } catch (err) {
      next(err);
    }
  };

  updateNationality = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const validated = updateNationalitySchema.parse(req.body);
      const item = await this.service.updateNationality(id, validated);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Nationality updated successfully',
        data: item,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteNationality = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      await this.service.deleteNationality(id);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Nationality deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  };
}

export const nationalityController = new NationalityController();
