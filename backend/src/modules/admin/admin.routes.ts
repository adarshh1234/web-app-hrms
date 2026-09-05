import { Router } from 'express';
import userRoutes from './user/user.routes';
import jobTitleRoutes from './jobTitle/jobTitle.routes';
import organizationRoutes from './organization/organization.routes';
import qualificationRoutes from './qualification/qualification.routes';
import nationalityRoutes from './nationality/nationality.routes';
import brandingRoutes from './branding/branding.routes';
import configRoutes from './config/config.routes';
import { jobConfigController } from './jobConfig/jobConfig.controller';

import { purgeAdminRecords } from './purge.service';

const router = Router();

const handlePurge = async (_req: any, res: any, next: any) => {
  try {
    const result = await purgeAdminRecords();
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    return next(err);
  }
};

router.delete('/purge-admin-data', handlePurge);
router.post('/purge-admin-data', handlePurge);
router.get('/purge-admin-data', handlePurge);

router.use('/users', userRoutes);
router.use('/job-titles', jobTitleRoutes);
router.use('/organizations', organizationRoutes);
router.use('/qualifications', qualificationRoutes);
router.use('/nationalities', nationalityRoutes);
router.use('/branding', brandingRoutes);
router.use('/configuration', configRoutes);

// Pay Grades
router.get('/pay-grades', jobConfigController.getPayGrades);
router.post('/pay-grades', jobConfigController.createPayGrade);
router.patch('/pay-grades/:id', jobConfigController.updatePayGrade);
router.delete('/pay-grades/:id', jobConfigController.deletePayGrade);

// Employment Statuses
router.get('/employment-statuses', jobConfigController.getEmpStatuses);
router.post('/employment-statuses', jobConfigController.createEmpStatus);
router.patch('/employment-statuses/:id', jobConfigController.updateEmpStatus);
router.delete('/employment-statuses/:id', jobConfigController.deleteEmpStatus);

// Job Categories
router.get('/job-categories', jobConfigController.getJobCategories);
router.post('/job-categories', jobConfigController.createJobCategory);
router.patch('/job-categories/:id', jobConfigController.updateJobCategory);
router.delete('/job-categories/:id', jobConfigController.deleteJobCategory);

// Work Shifts
router.get('/work-shifts', jobConfigController.getWorkShifts);
router.post('/work-shifts', jobConfigController.createWorkShift);
router.patch('/work-shifts/:id', jobConfigController.updateWorkShift);
router.delete('/work-shifts/:id', jobConfigController.deleteWorkShift);

// Locations
router.get('/locations', jobConfigController.getLocations);
router.post('/locations', jobConfigController.createLocation);
router.patch('/locations/:id', jobConfigController.updateLocation);
router.delete('/locations/:id', jobConfigController.deleteLocation);

// Departments
router.get('/departments', jobConfigController.getDepartments);
router.post('/departments', jobConfigController.createDepartment);
router.patch('/departments/:id', jobConfigController.updateDepartment);
router.delete('/departments/:id', jobConfigController.deleteDepartment);

export default router;
