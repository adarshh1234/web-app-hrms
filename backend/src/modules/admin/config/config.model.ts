import mongoose, { Schema, Document } from 'mongoose';

export interface IConfigurationDoc extends Document {
  emailConfig: Record<string, any>;
  emailSubscriptions: Record<string, any>;
  localization: Record<string, any>;
  modules: Record<string, any>;
  socialAuth: Record<string, any>;
  oauthClients: Record<string, any>;
  ldapAuth: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ConfigurationSchema = new Schema<IConfigurationDoc>(
  {
    emailConfig: { type: Schema.Types.Mixed, default: { mailSentEngine: 'SMTP', sendAsEmail: 'admin@huremaso.org', smtpHost: 'smtp.huremaso.org', smtpPort: 587 } },
    emailSubscriptions: { type: Schema.Types.Mixed, default: { leaveApproval: true, onboardingAlerts: true, systemAlerts: true } },
    localization: { type: Schema.Types.Mixed, default: { language: 'en_US', dateFormat: 'YYYY-MM-DD', timeZone: 'UTC+05:30' } },
    modules: { type: Schema.Types.Mixed, default: { recruitment: true, leave: true, attendance: true, payroll: true, performance: true } },
    socialAuth: { type: Schema.Types.Mixed, default: { googleAuthEnabled: false, githubAuthEnabled: false } },
    oauthClients: { type: Schema.Types.Mixed, default: [] },
    ldapAuth: { type: Schema.Types.Mixed, default: { enabled: false, serverUrl: '', bindDn: '' } },
  },
  {
    timestamps: true,
  }
);

export const ConfigurationModel = mongoose.model<IConfigurationDoc>('Configuration', ConfigurationSchema);
