import { z } from 'zod';
import { listSchema as sharedListSchema, withCommonFields } from '@/services/api/shared/base-schema';

export const listSchema = sharedListSchema;

export const createSchema = withCommonFields(
  z.object({
    patient_id: z.string().uuid(),
    provider_id: z.string().uuid(),
    appointment_id: z.string().uuid().optional(),
    note_type: z.string().min(1),
    content: z.string().min(1)
  })
);

export const updateSchema = createSchema.partial().extend({
  id: z.string().uuid()
});
