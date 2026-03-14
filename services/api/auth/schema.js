import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['patient', 'provider', 'admin']).default('patient')
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
