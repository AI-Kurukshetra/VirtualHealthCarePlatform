import { z } from 'zod';
import { listSchema as sharedListSchema, withCommonFields } from '@/services/api/shared/base-schema';

export const listSchema = sharedListSchema;

export const createSchema = withCommonFields(
  z.object({
    patient_id: z.string().uuid(),
    record_type: z.string().min(1),
    summary: z.string().min(1)
  })
);

export const updateSchema = createSchema.partial().extend({
  id: z.string().uuid()
});
