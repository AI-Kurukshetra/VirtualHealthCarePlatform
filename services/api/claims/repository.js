import { createBaseRepository } from '@/services/api/shared/base-repository';

const repository = createBaseRepository('claims', { organizationScoped: false });

export default repository;
