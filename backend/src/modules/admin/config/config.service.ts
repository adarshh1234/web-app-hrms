import { configurationRepository, ConfigurationRepository } from './config.repository';
import { IConfigurationDoc } from './config.model';

export class ConfigurationService {
  constructor(private repo: ConfigurationRepository = configurationRepository) {}

  async getConfiguration(): Promise<IConfigurationDoc> {
    return await this.repo.getConfiguration();
  }

  async updateConfiguration(data: Partial<IConfigurationDoc>): Promise<IConfigurationDoc> {
    return await this.repo.updateConfiguration(data);
  }
}

export const configurationService = new ConfigurationService();
