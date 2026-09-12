import { Request, Response, NextFunction } from 'express';
import { jobConfigService } from './jobConfig.service';
import { sendResponse } from '../../../common/utils/apiResponse';
import {
  mongoIdSchema,
  createPayGradeSchema,
  updatePayGradeSchema,
  createEmpStatusSchema,
  updateEmpStatusSchema,
  createJobCategorySchema,
  updateJobCategorySchema,
  createWorkShiftSchema,
  updateWorkShiftSchema,
  createLocationSchema,
  updateLocationSchema,
  createDepartmentSchema,
  updateDepartmentSchema,
} from './jobConfig.validator';

export class JobConfigController {
  // Pay Grades
  getPayGrades = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getPayGrades();
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  createPayGrade = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createPayGradeSchema.parse(req.body);
      const data = await jobConfigService.createPayGrade(validated);
      sendResponse({ res, statusCode: 201, data });
    } catch (err) { next(err); }
  };
  updatePayGrade = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const validated = updatePayGradeSchema.parse(req.body);
      const data = await jobConfigService.updatePayGrade(id, validated);
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  deletePayGrade = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      await jobConfigService.deletePayGrade(id);
      sendResponse({ res, statusCode: 200, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };

  // Employment Statuses
  getEmpStatuses = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getEmpStatuses();
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  createEmpStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createEmpStatusSchema.parse(req.body);
      const data = await jobConfigService.createEmpStatus(validated);
      sendResponse({ res, statusCode: 201, data });
    } catch (err) { next(err); }
  };
  updateEmpStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const validated = updateEmpStatusSchema.parse(req.body);
      const data = await jobConfigService.updateEmpStatus(id, validated);
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  deleteEmpStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      await jobConfigService.deleteEmpStatus(id);
      sendResponse({ res, statusCode: 200, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };

  // Job Categories
  getJobCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getJobCategories();
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  createJobCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createJobCategorySchema.parse(req.body);
      const data = await jobConfigService.createJobCategory(validated);
      sendResponse({ res, statusCode: 201, data });
    } catch (err) { next(err); }
  };
  updateJobCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const validated = updateJobCategorySchema.parse(req.body);
      const data = await jobConfigService.updateJobCategory(id, validated);
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  deleteJobCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      await jobConfigService.deleteJobCategory(id);
      sendResponse({ res, statusCode: 200, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };

  // Work Shifts
  getWorkShifts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getWorkShifts();
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  createWorkShift = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createWorkShiftSchema.parse(req.body);
      const data = await jobConfigService.createWorkShift(validated);
      sendResponse({ res, statusCode: 201, data });
    } catch (err) { next(err); }
  };
  updateWorkShift = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const validated = updateWorkShiftSchema.parse(req.body);
      const data = await jobConfigService.updateWorkShift(id, validated);
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  deleteWorkShift = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      await jobConfigService.deleteWorkShift(id);
      sendResponse({ res, statusCode: 200, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };

  // Locations
  getLocations = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getLocations();
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  createLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createLocationSchema.parse(req.body);
      const data = await jobConfigService.createLocation(validated);
      sendResponse({ res, statusCode: 201, data });
    } catch (err) { next(err); }
  };
  updateLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const validated = updateLocationSchema.parse(req.body);
      const data = await jobConfigService.updateLocation(id, validated);
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  deleteLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      await jobConfigService.deleteLocation(id);
      sendResponse({ res, statusCode: 200, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };

  // Departments
  getDepartments = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getDepartments();
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  createDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = createDepartmentSchema.parse(req.body);
      const data = await jobConfigService.createDepartment(validated);
      sendResponse({ res, statusCode: 201, data });
    } catch (err) { next(err); }
  };
  updateDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      const validated = updateDepartmentSchema.parse(req.body);
      const data = await jobConfigService.updateDepartment(id, validated);
      sendResponse({ res, statusCode: 200, data });
    } catch (err) { next(err); }
  };
  deleteDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = mongoIdSchema.parse(req.params.id);
      await jobConfigService.deleteDepartment(id);
      sendResponse({ res, statusCode: 200, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };
}

export const jobConfigController = new JobConfigController();
