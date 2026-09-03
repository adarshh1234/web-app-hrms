import { MessageLog } from '../types';
import notificationService from './notificationService';

export const messagingService = {
  async getMessageLogs(channel?: string): Promise<MessageLog[]> {
    const res = await notificationService.getNotifications({ channel });
    return res.data.map((item) => {
      let chan: MessageLog['channel'] = 'Email';
      if (item.channel === 'SMS') chan = 'SMS';
      else if (item.channel === 'WHATSAPP') chan = 'WhatsApp';
      else if (item.channel === 'EMPLOYEE_APP') chan = 'Employee App';

      return {
        id: item.id,
        channel: chan,
        subject: item.subject || 'No Subject',
        recipients: item.recipients || 'All Employees',
        message: item.message,
        dateSent: item.createdAt
          ? new Date(item.createdAt).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        status: item.status === 'DRAFT' ? 'Draft' : 'Sent',
        replies: 0,
      };
    });
  },

  async createMessageLog(data: Omit<MessageLog, 'id' | 'dateSent'>): Promise<MessageLog> {
    const created = await notificationService.createNotification({
      channel: data.channel,
      subject: data.subject,
      message: data.message,
      recipients: data.recipients,
      status: data.status === 'Draft' ? 'DRAFT' : 'SENT',
    });

    let chan: MessageLog['channel'] = 'Email';
    if (created.channel === 'SMS') chan = 'SMS';
    else if (created.channel === 'WHATSAPP') chan = 'WhatsApp';
    else if (created.channel === 'EMPLOYEE_APP') chan = 'Employee App';

    return {
      id: created.id,
      channel: chan,
      subject: created.subject || 'No Subject',
      recipients: created.recipients,
      message: created.message,
      dateSent: created.createdAt
        ? new Date(created.createdAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      status: created.status === 'DRAFT' ? 'Draft' : 'Sent',
      replies: 0,
    };
  },

  async saveMessageLogs(logs: MessageLog[]): Promise<void> {
    // No-op for direct persistence
  },
};

export default messagingService;

