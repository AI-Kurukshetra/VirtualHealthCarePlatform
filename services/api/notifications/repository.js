import { createBaseRepository } from '@/services/api/shared/base-repository';

const repository = createBaseRepository('notifications', { organizationScoped: false });

export default repository;
