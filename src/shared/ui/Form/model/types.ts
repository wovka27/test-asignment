import { ZodSchema } from 'zod/v3';

export interface FormProps<T extends Record<string, unknown>> {
  schema?: ZodSchema<T>;
  defaultValues?: T;
  children?: React.ReactNode;
  onSubmit: (value: T) => void;
  syncValues?: (values: T) => void;
}
