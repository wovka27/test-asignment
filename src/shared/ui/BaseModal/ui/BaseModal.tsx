import React from 'react';

import { createPortal } from 'react-dom';

import clsx from 'clsx';

import type { BaseModalType } from '@shared/ui/BaseModal/model';
import Button from '@shared/ui/Button';

import './base-modal.scss';

const BaseModal: BaseModalType = ({ onClick, onCancel, ref, children, modalKey }) =>
  createPortal(
    <dialog onClick={onClick} onCancel={onCancel} ref={ref} className={clsx('base-modal')}>
      {children}
    </dialog>,
    document.body,
    modalKey
  );

const Header: BaseModalType['Header'] = ({ title }) => (
  <header>
    <h2 className={clsx('base-modal__title')}>{title}</h2>
  </header>
);

const Body: BaseModalType['Body'] = ({ children }) => {
  return children;
};

const Actions: BaseModalType['Actions'] = ({
  onCancelForBtn,
  onConfirmForBtn,
  cancelButtonText,
  confirmButtonText,
}) => {
  return (
    <div className={clsx('base-modal__footer')}>
      <Button size="lg" variant="outline" onClick={onCancelForBtn}>
        {cancelButtonText}
      </Button>
      <Button size="lg" variant="filled" type="submit" onClick={onConfirmForBtn}>
        {confirmButtonText}
      </Button>
    </div>
  );
};

BaseModal.Header = Header;
BaseModal.Body = Body;
BaseModal.Actions = Actions;

export default BaseModal;
