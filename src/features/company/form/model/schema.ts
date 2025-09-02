import { z } from 'zod/v3';

export const schema = z.object({
  type: z.array(z.string()).min(2, 'Minimum 2 options'),
  businessEntity: z.string(),
  contract: z.object({
    no: z.string().regex(/^\d{1,4}\/\d-\d{2}$/, 'Invalid value (Correct - 1111/1-11)'),
    issue_date: z.string(),
  }),
});

export type FormValues = z.infer<typeof schema>;
