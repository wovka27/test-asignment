import { createPortal } from 'react-dom';

import clsx from 'clsx';

import type { BaseModalType } from '@shared/ui/BaseModal/model';
import Button from '@shared/ui/Button';

import './base-modal.scss';

export const BaseModal: BaseModalType = ({
  children,
  title,
  formId,
  cancelButtonText,
  confirmButtonText,
  onCancelForBtn,
  onConfirmForBtn,
  onClick,
  onCancel,
  ref,
  modalKey,
}) =>
  createPortal(
    <dialog onClick={onClick} onCancel={onCancel} ref={ref} className={clsx('base-modal')}>
      <header>
        <h2 className={clsx('base-modal__title')}>{title}</h2>
      </header>
      <main>{children}</main>
      <footer className={clsx('base-modal__footer')}>
        <Button size="lg" variant="outline" onClick={onCancelForBtn}>
          {cancelButtonText}
        </Button>
        <Button form={formId} size="lg" variant="filled" type="submit" onClick={onConfirmForBtn}>
          {confirmButtonText}
        </Button>
      </footer>
    </dialog>,
    document.body,
    modalKey
  );
