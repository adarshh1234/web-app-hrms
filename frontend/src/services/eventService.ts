import { CompanyEvent } from '../types';
import { getEvents, saveEvents } from '../data/mockData';

export const eventService = {
  async getEvents(): Promise<CompanyEvent[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getEvents()), 100);
    });
  },

  async createEvent(eventData: Omit<CompanyEvent, 'id'>): Promise<CompanyEvent> {
    const list = getEvents();
    const newEvent: CompanyEvent = {
      ...eventData,
      id: `EVT-${Math.floor(100 + Math.random() * 900)}`,
    };
    saveEvents([newEvent, ...list]);
    return newEvent;
  },

  async updateEvent(id: string, updates: Partial<CompanyEvent>): Promise<CompanyEvent> {
    const list = getEvents();
    const index = list.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Event not found');
    list[index] = { ...list[index], ...updates };
    saveEvents(list);
    return list[index];
  },

  async deleteEvent(id: string): Promise<boolean> {
    const list = getEvents();
    const filtered = list.filter((e) => e.id !== id);
    saveEvents(filtered);
    return true;
  },
};

export default eventService;
