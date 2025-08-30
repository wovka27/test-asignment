export interface BaseModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  formId: string;
  title: string;
  cancelButtonText: string;
  confirmButtonText: string;
  onCancelForBtn?: () => void;
  onConfirmForBtn?: () => void;
  ref?: React.Ref<HTMLDialogElement>;
  modalKey?: React.Key | null;
}

export type BaseModalType = React.FC<React.PropsWithChildren<BaseModalProps>>;
