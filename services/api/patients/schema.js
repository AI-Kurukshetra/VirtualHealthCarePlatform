import { z } from 'zod';
import { listSchema as sharedListSchema, withCommonFields } from '@/services/api/shared/base-schema';

export const listSchema = sharedListSchema;

export const createSchema = withCommonFields(
  z.object({
    user_id: z.string().uuid().optional(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    date_of_birth: z.string().min(1),
    gender: z.string().min(1),
    phone: z.string().min(8),
    address: z.string().min(5),
    insurance_id: z.string().min(1)
  })
);

export const updateSchema = createSchema.partial().extend({
  id: z.string().uuid()
});
