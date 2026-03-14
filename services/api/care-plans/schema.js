import { z } from 'zod';
import { listSchema as sharedListSchema, withCommonFields } from '@/services/api/shared/base-schema';

export const listSchema = sharedListSchema;

export const createSchema = withCommonFields(
  z.object({
    patient_id: z.string().uuid(),
    provider_id: z.string().uuid(),
    title: z.string().min(1),
    goals: z.string().min(1),
    interventions: z.string().min(1),
    status: z.string().min(1),
    start_date: z.string().optional(),
    end_date: z.string().optional()
  })
);

export const updateSchema = createSchema.partial().extend({
  id: z.string().uuid()
});
