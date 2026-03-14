import { z } from 'zod';
import { listSchema as sharedListSchema, withCommonFields } from '@/services/api/shared/base-schema';

export const listSchema = sharedListSchema;

export const createSchema = withCommonFields(
  z.object({
    lab_order_id: z.string().uuid(),
    result_data: z.any(),
    result_date: z.string().min(1)
  })
);

export const updateSchema = createSchema.partial().extend({
  id: z.string().uuid()
});
