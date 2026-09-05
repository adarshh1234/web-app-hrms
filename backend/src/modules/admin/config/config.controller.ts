import { Request, Response, NextFunction } from 'express';
import { configurationService, ConfigurationService } from './config.service';
import { sendResponse } from '../../../common/utils/apiResponse';
import { updateConfigurationSchema } from './config.validator';

export class ConfigurationController {
  constructor(private service: ConfigurationService = configurationService) {}

  getConfiguration = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const conf = await this.service.getConfiguration();
      sendResponse({
        res,
        statusCode: 200,
        data: conf,
      });
    } catch (err) {
      next(err);
    }
  };

  updateConfiguration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = updateConfigurationSchema.parse(req.body);
      const conf = await this.service.updateConfiguration(validated);
      sendResponse({
        res,
        statusCode: 200,
        message: 'System Configuration updated successfully',
        data: conf,
      });
    } catch (err) {
      next(err);
    }
  };
}

export const configurationController = new ConfigurationController();
