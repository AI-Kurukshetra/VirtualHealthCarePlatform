import { z } from 'zod';
import { listSchema as sharedListSchema, withCommonFields } from '@/services/api/shared/base-schema';

export const listSchema = sharedListSchema;

export const createSchema = withCommonFields(
  z.object({
    user_id: z.string().uuid().optional(),
    specialization: z.string().min(1),
    license_number: z.string().min(1),
    years_of_experience: z.coerce.number().int().min(0).max(70)
  })
);

export const updateSchema = createSchema.partial().extend({
  id: z.string().uuid()
});
