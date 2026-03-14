import { createBaseService } from '@/services/api/shared/base-service';
import repository from './repository';

const service = createBaseService(repository);

export default service;
