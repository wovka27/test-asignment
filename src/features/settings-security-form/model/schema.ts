import { z } from 'zod/v3';

export const schema = z.object({
  two_factor_enabled: z.coerce.boolean(),
  last_password_change: z.date(),
  login_alerts: z.coerce.boolean(),
});

export type FormValues = z.infer<typeof schema>;
