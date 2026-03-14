import { AppError, withErrorHandling } from '@/utils/error-handler';

export function createBaseService(repository) {
  return {
    async list(input) {
      return withErrorHandling(async () => repository.list(input));
    },

    async getById(id, organizationId) {
      return withErrorHandling(async () => {
        const record = await repository.getById(id, organizationId);

        if (!record) {
          throw new AppError('Record not found.', 404);
        }

        return record;
      });
    },

    async create(payload) {
      return withErrorHandling(async () => repository.create(payload));
    },

    async updateById(id, payload, organizationId) {
      return withErrorHandling(async () => repository.updateById(id, payload, organizationId));
    },

    async deleteById(id, organizationId) {
      return withErrorHandling(async () => repository.deleteById(id, organizationId));
    }
  };
}
