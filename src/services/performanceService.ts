import { PerformanceReview } from '../types';
import { getPerformanceReviews, savePerformanceReviews } from '../data/mockData';

export const performanceService = {
  async getPerformanceReviews(): Promise<PerformanceReview[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getPerformanceReviews()), 100);
    });
  },

  async savePerformanceReviews(reviews: PerformanceReview[]): Promise<void> {
    savePerformanceReviews(reviews);
  },
};

export default performanceService;
