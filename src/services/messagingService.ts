import { MessageLog } from '../types';
import { getMessageLogs, saveMessageLogs } from '../data/mockData';

export const messagingService = {
  async getMessageLogs(): Promise<MessageLog[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMessageLogs()), 100);
    });
  },

  async createMessageLog(data: Omit<MessageLog, 'id' | 'dateSent'>): Promise<MessageLog> {
    const list = getMessageLogs();
    const newLog: MessageLog = {
      ...data,
      id: `MSG-${Math.floor(100 + Math.random() * 900)}`,
      dateSent: new Date().toISOString().split('T')[0],
    };
    saveMessageLogs([newLog, ...list]);
    return newLog;
  },

  async saveMessageLogs(logs: MessageLog[]): Promise<void> {
    saveMessageLogs(logs);
  },
};

export default messagingService;
