import { z } from 'zod/v3';

export const schema = z.object({
  plan: z.string(),
  status: z.string(),
  renewal_date: z.string().date(),
});

export type FormValues = z.infer<typeof schema>;
