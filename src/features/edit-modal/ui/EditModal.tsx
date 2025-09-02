import { Controller, useFormContext } from 'react-hook-form';

import type { ModalRegistry } from '@app/providers/modal/model/types';

import Input from '@shared/ui/Input';

import './edit-modal.scss';

export const EditModal: ModalRegistry['edit'] = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors.name?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={'name'}
      render={({ field }) => <Input error={error} {...field} />}
    />
  );
};
