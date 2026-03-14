import { z } from 'zod';
import { listSchema as sharedListSchema } from '@/services/api/shared/base-schema';

export const listSchema = sharedListSchema;

export const createSchema = z.object({
  billing_id: z.string().uuid(),
  insurance_provider: z.string().min(1),
  claim_status: z.string().min(1),
  submitted_at: z.string().optional(),
  processed_at: z.string().optional()
});

export const updateSchema = createSchema.partial().extend({
  id: z.string().uuid()
});
