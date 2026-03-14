import { withErrorHandling } from '@/utils/error-handler';
import analyticsRepository from './repository';

const analyticsService = {
  async getKpis(organizationId) {
    return withErrorHandling(async () => analyticsRepository.getKpis(organizationId));
  }
};

export default analyticsService;
