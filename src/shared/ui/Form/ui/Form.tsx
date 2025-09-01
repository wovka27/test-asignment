import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react';
import { FormProvider, useForm } from 'react-hook-form';

import type { FormProps } from '@shared/ui/Form/model/types.ts';

export const Form = observer(
  <T extends Record<string, unknown>>({
    schema,
    defaultValues,
    onSubmit,
    children,
    syncValues,
  }: FormProps<T>) => {
    const methods = useForm<T>({
      resolver: zodResolver(schema),
      defaultValues,
      mode: 'onChange',
    });

    if (syncValues) methods.watch((values) => syncValues(values));

    return (
      <FormProvider {...methods}>
        <form style={{ display: 'contents' }} onSubmit={methods.handleSubmit(onSubmit)}>
          {children}
        </form>
      </FormProvider>
    );
  }
);
