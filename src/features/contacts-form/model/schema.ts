import { z } from 'zod/v3';

export const schema = z.object({
  email: z.string().email('Invalid E-mail'),
  phone: z.string().min(11, 'Min 11 numbers'),
  fullName: z
    .string()
    .trim()
    .min(1, 'field is required')
    .refine((val) => val.split(' ').length === 2, {
      message: 'Enter firstname and lastname separated by a space',
    }),
});

export type FormValues = z.infer<typeof schema>;
