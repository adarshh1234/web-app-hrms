import { Request, Response, NextFunction } from 'express';
import { organizationService, OrganizationService } from './organization.service';
import { sendResponse } from '../../../common/utils/apiResponse';
import { updateOrganizationSchema, addLocationSchema } from './organization.validator';

export class OrganizationController {
  constructor(private service: OrganizationService = organizationService) {}

  getOrganization = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const org = await this.service.getOrganization();
      sendResponse({
        res,
        statusCode: 200,
        data: org,
      });
    } catch (err) {
      next(err);
    }
  };

  updateOrganization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = updateOrganizationSchema.parse(req.body);
      const org = await this.service.updateOrganization(validated);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Organization details updated successfully',
        data: org,
      });
    } catch (err) {
      next(err);
    }
  };

  addLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = addLocationSchema.parse(req.body);
      const org = await this.service.addLocation(validated);
      sendResponse({
        res,
        statusCode: 201,
        message: 'Location added successfully',
        data: org,
      });
    } catch (err) {
      next(err);
    }
  };

  removeLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = String(req.params.id);
      const org = await this.service.removeLocation(id);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Location removed successfully',
        data: org,
      });
    } catch (err) {
      next(err);
    }
  };
}

export const organizationController = new OrganizationController();
