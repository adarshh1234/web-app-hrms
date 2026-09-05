import { Router } from 'express';
import userRoutes from './user/user.routes';
import jobTitleRoutes from './jobTitle/jobTitle.routes';
import organizationRoutes from './organization/organization.routes';
import qualificationRoutes from './qualification/qualification.routes';
import nationalityRoutes from './nationality/nationality.routes';
import brandingRoutes from './branding/branding.routes';
import configRoutes from './config/config.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/job-titles', jobTitleRoutes);
router.use('/organizations', organizationRoutes);
router.use('/qualifications', qualificationRoutes);
router.use('/nationalities', nationalityRoutes);
router.use('/branding', brandingRoutes);
router.use('/configuration', configRoutes);

export default router;
