import { Request, Response, NextFunction } from 'express';
import { jobConfigService } from './jobConfig.service';

export class JobConfigController {
  // Pay Grades
  getPayGrades = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getPayGrades();
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  createPayGrade = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.createPayGrade(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };
  updatePayGrade = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.updatePayGrade(String(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  deletePayGrade = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await jobConfigService.deletePayGrade(String(req.params.id));
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };

  // Employment Statuses
  getEmpStatuses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getEmpStatuses();
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  createEmpStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.createEmpStatus(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };
  updateEmpStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.updateEmpStatus(String(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  deleteEmpStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await jobConfigService.deleteEmpStatus(String(req.params.id));
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };

  // Job Categories
  getJobCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getJobCategories();
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  createJobCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.createJobCategory(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };
  updateJobCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.updateJobCategory(String(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  deleteJobCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await jobConfigService.deleteJobCategory(String(req.params.id));
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };

  // Work Shifts
  getWorkShifts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getWorkShifts();
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  createWorkShift = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.createWorkShift(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };
  updateWorkShift = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.updateWorkShift(String(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  deleteWorkShift = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await jobConfigService.deleteWorkShift(String(req.params.id));
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };

  // Locations
  getLocations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getLocations();
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  createLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.createLocation(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };
  updateLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.updateLocation(String(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  deleteLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await jobConfigService.deleteLocation(String(req.params.id));
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };

  // Departments
  getDepartments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.getDepartments();
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  createDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.createDepartment(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };
  updateDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await jobConfigService.updateDepartment(String(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (err) { next(err); }
  };
  deleteDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await jobConfigService.deleteDepartment(String(req.params.id));
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };
}

export const jobConfigController = new JobConfigController();
