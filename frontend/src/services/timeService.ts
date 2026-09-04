import { AttendanceRecord } from '../types';
import {
  getAttendanceRecords,
  saveAttendanceRecords,
  getPunchStatus,
  savePunchStatus,
} from '../data/mockData';

export const timeService = {
  async getAttendanceRecords(): Promise<AttendanceRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getAttendanceRecords()), 100);
    });
  },

  async saveAttendanceRecords(records: AttendanceRecord[]): Promise<void> {
    saveAttendanceRecords(records);
  },

  async getPunchStatus(): Promise<{ punchedIn: boolean; time?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getPunchStatus()), 100);
    });
  },

  async savePunchStatus(status: { punchedIn: boolean; time?: string }): Promise<void> {
    savePunchStatus(status);
  },
};

export default timeService;
