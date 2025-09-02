import { z } from 'zod/v3';

export const schema = z.object({
  two_factor_enabled: z.string(),
  last_password_change: z.string(),
  login_alerts: z.string(),
});

export type FormValues = z.infer<typeof schema>;
