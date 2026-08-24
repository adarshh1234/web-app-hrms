import { Candidate, Vacancy } from '../types';
import { getCandidates, saveCandidates, getVacancies, saveVacancies } from '../data/mockData';

export const recruitmentService = {
  async getCandidates(): Promise<Candidate[]> {
    return new Promise((resolve) => resolve(getCandidates()));
  },

  async getVacancies(): Promise<Vacancy[]> {
    return new Promise((resolve) => resolve(getVacancies()));
  },

  async createCandidate(candidate: Omit<Candidate, 'id' | 'dateApplied'>): Promise<Candidate> {
    const list = getCandidates();
    const newCand: Candidate = {
      ...candidate,
      id: `CAND-${Math.floor(100 + Math.random() * 900)}`,
      dateApplied: new Date().toISOString().split('T')[0],
    };
    saveCandidates([newCand, ...list]);
    return newCand;
  },

  async updateCandidateStatus(id: string, status: Candidate['status']): Promise<Candidate> {
    const list = getCandidates();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Candidate not found');
    list[index].status = status;
    saveCandidates(list);
    return list[index];
  },

  async createVacancy(vacancy: Omit<Vacancy, 'id' | 'datePosted'>): Promise<Vacancy> {
    const list = getVacancies();
    const newVac: Vacancy = {
      ...vacancy,
      id: `VAC-${Math.floor(100 + Math.random() * 900)}`,
      datePosted: new Date().toISOString().split('T')[0],
    };
    saveVacancies([newVac, ...list]);
    return newVac;
  },

  async updateVacancyStatus(id: string, status: 'Available' | 'Closed'): Promise<Vacancy> {
    const list = getVacancies();
    const index = list.findIndex((v) => v.id === id);
    if (index === -1) throw new Error('Vacancy not found');
    list[index].status = status;
    saveVacancies(list);
    return list[index];
  },
};

export default recruitmentService;
