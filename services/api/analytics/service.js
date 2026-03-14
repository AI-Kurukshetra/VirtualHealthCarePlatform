import { withErrorHandling } from '@/utils/error-handler';
import analyticsRepository from './repository';

const analyticsService = {
  async getKpis(organizationId, limit = 25) {
    return withErrorHandling(async () => analyticsRepository.getKpis(organizationId, limit));
  }
};

export default analyticsService;
