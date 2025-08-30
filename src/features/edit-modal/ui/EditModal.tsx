import { useActionState } from 'react';

import type { ModalRegistry } from '@app/providers/modal/model/types';

import './edit-modal.scss';
import Input from '@shared/ui/Input';

export const EditModal: ModalRegistry['edit'] = ({ name, formId, onSubmit }) => {
  const [state, action] = useActionState<string>((_: string, payload: unknown): string | Promise<string> => {
    onSubmit?.(payload);
    return payload;
  }, name);

  return (
    <form action={action} id={formId}>
      <Input name="name" defaultValue={state} />
    </form>
  );
};
