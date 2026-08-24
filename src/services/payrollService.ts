import { FinanceRequest } from '../types';
import { getFinanceRequests, saveFinanceRequests } from '../data/mockData';

export const payrollService = {
  async getFinanceRequests(): Promise<FinanceRequest[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getFinanceRequests()), 100);
    });
  },

  async createFinanceRequest(data: Omit<FinanceRequest, 'id' | 'dateRequested' | 'status'>): Promise<FinanceRequest> {
    const list = getFinanceRequests();
    const newReq: FinanceRequest = {
      ...data,
      id: `FIN-${Math.floor(100 + Math.random() * 900)}`,
      dateRequested: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    saveFinanceRequests([newReq, ...list]);
    return newReq;
  },

  async updateFinanceRequestStatus(id: string, status: 'Approved' | 'Rejected'): Promise<FinanceRequest> {
    const list = getFinanceRequests();
    const index = list.findIndex((req) => req.id === id);
    if (index === -1) throw new Error('Finance request not found');

    list[index] = { ...list[index], status };
    saveFinanceRequests(list);
    return list[index];
  },
};

export default payrollService;
