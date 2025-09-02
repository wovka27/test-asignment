import { z } from 'zod/v3';

export const schema = z.object({
  language: z.string(),
  time_zone: z.string(),
  theme: z.string(),
});

export type FormValues = z.infer<typeof schema>;
