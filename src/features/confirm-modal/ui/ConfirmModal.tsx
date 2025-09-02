import type { ModalRegistry } from '@app/providers/modal/model/types';

import './confirm-modal.scss';

export const ConfirmModal: ModalRegistry['confirm'] = ({ text }) => {
  return <p className="confirm-modal">{text}</p>;
};
