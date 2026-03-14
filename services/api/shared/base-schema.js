import { z } from 'zod';

export const listSchema = z.object({
  organization_id: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0)
});

export function withCommonFields(schema) {
  return schema.extend({
    organization_id: z.string().uuid().optional()
  });
}
