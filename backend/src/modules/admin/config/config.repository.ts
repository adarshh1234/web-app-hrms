import { ConfigurationModel, IConfigurationDoc } from './config.model';

export class ConfigurationRepository {
  async getConfiguration(): Promise<IConfigurationDoc> {
    let conf = await ConfigurationModel.findOne();
    if (!conf) {
      conf = await ConfigurationModel.create({});
    }
    return conf;
  }

  async updateConfiguration(data: Partial<IConfigurationDoc>): Promise<IConfigurationDoc> {
    const conf = await this.getConfiguration();
    Object.assign(conf, data);
    return await conf.save();
  }
}

export const configurationRepository = new ConfigurationRepository();
