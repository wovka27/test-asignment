import { z } from 'zod/v3';

export const schema = z.object({
  email_notifications: z.coerce.boolean(),
  sms_notifications: z.coerce.boolean(),
  push_notifications: z.coerce.boolean(),
});

export type FormValues = z.infer<typeof schema>;
