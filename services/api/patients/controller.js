import { createBaseController } from '@/services/api/shared/base-controller';
import service from './service';
import { createSchema, listSchema, updateSchema } from './schema';

const controller = createBaseController({
  service,
  listSchema,
  createSchema,
  updateSchema
});

export default controller;
