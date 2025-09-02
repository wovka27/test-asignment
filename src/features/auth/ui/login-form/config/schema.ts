import { z } from 'zod/v3';

export const schema = z.object({
  user: z.string().min(3, 'Min 3 symbols'),
});
