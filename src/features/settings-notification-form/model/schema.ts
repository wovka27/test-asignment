import { z } from 'zod/v3';

export const schema = z.object({
  email_notifications: z.string(),
  sms_notifications: z.string(),
  push_notifications: z.string(),
});

export type FormValues = z.infer<typeof schema>;
