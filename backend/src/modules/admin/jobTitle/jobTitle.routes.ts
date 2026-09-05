import { Router } from 'express';
import { jobTitleController } from './jobTitle.controller';

const router = Router();

router.route('/')
  .post(jobTitleController.createJobTitle)
  .get(jobTitleController.getJobTitles);

router.route('/:id')
  .get(jobTitleController.getJobTitleById)
  .patch(jobTitleController.updateJobTitle)
  .delete(jobTitleController.deleteJobTitle);

export default router;
