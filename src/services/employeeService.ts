import { Employee } from '../types';
import { getEmployees, saveEmployees } from '../data/mockData';

export const employeeService = {
  async getAll(): Promise<Employee[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getEmployees());
      }, 100);
    });
  },

  async getById(id: string): Promise<Employee | undefined> {
    const list = getEmployees();
    return list.find((emp) => emp.id === id);
  },

  async create(employeeData: Omit<Employee, 'id'>): Promise<Employee> {
    const list = getEmployees();
    const newEmp: Employee = {
      ...employeeData,
      id: `EMP${Math.floor(100000 + Math.random() * 900000)}`,
    };
    const updated = [newEmp, ...list];
    saveEmployees(updated);
    return newEmp;
  },

  async update(id: string, updates: Partial<Employee>): Promise<Employee> {
    const list = getEmployees();
    const index = list.findIndex((emp) => emp.id === id);
    if (index === -1) throw new Error('Employee not found');

    const updatedEmp = { ...list[index], ...updates };
    list[index] = updatedEmp;
    saveEmployees(list);
    return updatedEmp;
  },

  async delete(id: string): Promise<boolean> {
    const list = getEmployees();
    const filtered = list.filter((emp) => emp.id !== id);
    saveEmployees(filtered);
    return true;
  },
};

export default employeeService;
