import { useActionState } from 'react';

import type { ModalRegistry } from '@app/providers/modal/model/types';

import './confirm-modal.scss';

export const ConfirmModal: ModalRegistry['confirm'] = ({ text, formId, onSubmit }) => {
  const [, action] = useActionState((_: unknown, payload: unknown) => {
    onSubmit?.(payload);
    return payload;
  }, {});

  return (
    <form action={action} id={formId}>
      <p className="confirm-modal">{text}</p>
    </form>
  );
};
