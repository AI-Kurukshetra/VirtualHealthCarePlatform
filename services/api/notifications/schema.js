import { z } from 'zod';
import { listSchema as sharedListSchema } from '@/services/api/shared/base-schema';

export const listSchema = sharedListSchema;

export const createSchema = z.object({
  user_id: z.string().uuid(),
  type: z.string().min(1),
  content: z.string().min(1),
  is_read: z.boolean().default(false)
});

export const updateSchema = createSchema.partial().extend({
  id: z.string().uuid()
});
