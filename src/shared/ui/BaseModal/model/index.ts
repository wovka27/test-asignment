import React from 'react';

export interface BaseModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  ref?: React.Ref<HTMLDialogElement>;
  modalKey?: React.Key | null;
}

export type BaseModalType = React.FC<React.PropsWithChildren<BaseModalProps>> & {
  Header: React.FC<{ title: string }>;
  Body: React.FC<React.PropsWithChildren>;
  Actions: React.FC<{
    cancelButtonText: string;
    confirmButtonText: string;
    onCancelForBtn?: (() => void) | undefined;
    onConfirmForBtn?: (() => void) | undefined;
  }>;
};
