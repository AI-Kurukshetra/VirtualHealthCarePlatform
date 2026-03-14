import { z } from 'zod';
import { listSchema as sharedListSchema, withCommonFields } from '@/services/api/shared/base-schema';

export const listSchema = sharedListSchema;

export const createSchema = withCommonFields(
  z.object({
    patient_name: z.string().min(1),
    appointment_date: z.string().min(1),
    status: z.enum(['scheduled', 'completed', 'cancelled', 'no_show']).default('scheduled'),
    notes: z.string().optional()
  })
);

export const updateSchema = createSchema.partial().extend({
  id: z.string().uuid()
});
