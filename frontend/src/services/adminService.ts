import { CorporateBranding, SupportTicket, AssociationRequest } from '../types';
import {
  getBranding,
  saveBranding,
  getSupportTickets,
  saveSupportTickets,
  getAssociationRequests,
  saveAssociationRequests,
} from '../data/mockData';

export const adminService = {
  getBranding(): CorporateBranding {
    return getBranding();
  },

  updateBranding(branding: CorporateBranding): void {
    saveBranding(branding);
  },

  async getSupportTickets(): Promise<SupportTicket[]> {
    return getSupportTickets();
  },

  async createSupportTicket(data: Omit<SupportTicket, 'id' | 'createdDate' | 'status'>): Promise<SupportTicket> {
    const list = getSupportTickets();
    const newTicket: SupportTicket = {
      ...data,
      id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Open',
    };
    saveSupportTickets([newTicket, ...list]);
    return newTicket;
  },

  async getAssociationRequests(): Promise<AssociationRequest[]> {
    return getAssociationRequests();
  },

  async updateAssociationStatus(id: string, status: 'Accepted' | 'Cancelled'): Promise<void> {
    const list = getAssociationRequests();
    const index = list.findIndex((a) => a.id === id);
    if (index !== -1) {
      list[index].status = status;
      saveAssociationRequests(list);
    }
  },
};

export default adminService;
