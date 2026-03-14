import { z } from 'zod';
import { listSchema as sharedListSchema, withCommonFields } from '@/services/api/shared/base-schema';

export const listSchema = sharedListSchema;

export const createSchema = withCommonFields(
  z.object({
    patient_id: z.string().uuid(),
    provider_id: z.string().uuid(),
    medication_name: z.string().min(1),
    dosage: z.string().min(1),
    frequency: z.string().min(1),
    duration: z.string().min(1),
    status: z.string().min(1)
  })
);

export const updateSchema = createSchema.partial().extend({
  id: z.string().uuid()
});
