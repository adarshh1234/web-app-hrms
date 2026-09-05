import { Request, Response, NextFunction } from 'express';
import { brandingService, BrandingService } from './branding.service';
import { sendResponse } from '../../../common/utils/apiResponse';
import { updateBrandingSchema } from './branding.validator';

export class BrandingController {
  constructor(private service: BrandingService = brandingService) {}

  getBranding = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const branding = await this.service.getBranding();
      sendResponse({
        res,
        statusCode: 200,
        data: branding,
      });
    } catch (err) {
      next(err);
    }
  };

  updateBranding = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = updateBrandingSchema.parse(req.body);
      const branding = await this.service.updateBranding(validated);
      sendResponse({
        res,
        statusCode: 200,
        message: 'Corporate Branding updated successfully',
        data: branding,
      });
    } catch (err) {
      next(err);
    }
  };
}

export const brandingController = new BrandingController();
