import { Request, Response, NextFunction } from 'express';
import { jobTitleService, JobTitleService } from './jobTitle.service';
import { sendResponse } from '../../../common/utils/apiResponse';
import {
  createJobTitleSchema,
  updateJobTitleSchema,
  queryJobTitleSchema,
  mongoIdSchema,
} from './jobTitle.validator';

export class JobTitleController {
  constructor(private service: JobTitleService = jobTitleService) {}

  createJobTitle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createJobTitleSchema.parse(req.body);
      const jobTitle = await this.service.createJobTitle(validated);
      sendResponse({
        res,
        statusCode: 201,
        message: 'Job Title created successfully',
        data: jobTitle,
      });
    } catch (err) {
      next(err);
    }
  };

  getJobTitles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = queryJobTitleSchema.parse(req.query);
      const jobTitles = await this.service.getJobTitles(query);
      sendResponse({
        res,
        statusCode: 200,
        data: jobTitles,
      });
    } catch (err) {
      next(err);
    }
  };

  getJobTitleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const jobTitle = await this.service.getJobTitleById(id);
      sendResponse({
        res,
        statusCode: 200,
        data: jobTitle,
      });
    } catch (err) {
      next(err);
    }
  };

  updateJobTitle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const validated = updateJobTitleSchema.parse(req.body);
      const jobTitle = await this.service.updateJobTitle(id, validated);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Job Title updated successfully',
        data: jobTitle,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteJobTitle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      await this.service.deleteJobTitle(id);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Job Title deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  };
}

export const jobTitleController = new JobTitleController();
