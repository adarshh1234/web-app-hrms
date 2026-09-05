import { Request, Response, NextFunction } from 'express';
import { qualificationService, QualificationService } from './qualification.service';
import { sendResponse } from '../../../common/utils/apiResponse';
import {
  createQualificationSchema,
  updateQualificationSchema,
  queryQualificationSchema,
  mongoIdSchema,
} from './qualification.validator';

export class QualificationController {
  constructor(private service: QualificationService = qualificationService) {}

  createQualification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createQualificationSchema.parse(req.body);
      const item = await this.service.createQualification(validated);
      sendResponse({
        res,
        statusCode: 201,
        message: 'Qualification created successfully',
        data: item,
      });
    } catch (err) {
      next(err);
    }
  };

  getQualifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = queryQualificationSchema.parse(req.query);
      const items = await this.service.getQualifications(query);
      sendResponse({
        res,
        statusCode: 200,
        data: items,
      });
    } catch (err) {
      next(err);
    }
  };

  getQualificationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const item = await this.service.getQualificationById(id);
      sendResponse({
        res,
        statusCode: 200,
        data: item,
      });
    } catch (err) {
      next(err);
    }
  };

  updateQualification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const validated = updateQualificationSchema.parse(req.body);
      const item = await this.service.updateQualification(id, validated);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Qualification updated successfully',
        data: item,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteQualification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      await this.service.deleteQualification(id);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Qualification deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  };
}

export const qualificationController = new QualificationController();
