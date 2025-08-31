import React, {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { modalRegistry } from '@app/providers/modal/lib/modalRegistry.ts';
import type { ModalContextValue, ModalStateConfig } from '@app/providers/modal/model/types';

import BaseModal from '@shared/ui/BaseModal';

const ModalContext = createContext<ModalContextValue | null>(null);

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const id = useId();
  const [modal, setModal] = useState<ModalStateConfig>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resolverRef = useRef<(<T>(value?: T) => void) | null>(null);
  const rejecterRef = useRef<(() => void) | null>(null);

  const closeModal = () => {
    dialogRef.current?.close();
    setModal(null);
  };

  const openModal: ModalContextValue['openModal'] = (config) => {
    return new Promise((resolve, reject) => {
      setModal({
        ...config,
        props: {
          ...config.props,
          onSubmit<T>(data: T) {
            resolve(data);
            closeModal();
          },
          onClose() {
            reject();
            closeModal();
          },
        },
      });
      resolverRef.current = resolve;
      rejecterRef.current = reject;
    });
  };

  const onClick: React.MouseEventHandler<HTMLDialogElement> = (e) => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isBackdropClick =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    if (isBackdropClick) onCancel();
  };

  const onCancel = () => {
    rejecterRef.current?.();
    closeModal();
  };

  useEffect(() => {
    if (modal && dialogRef.current) dialogRef.current.showModal();
  }, [modal]);

  const ModalComponent = modal ? modalRegistry[modal.type] : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {ModalComponent && (
        <BaseModal
          ref={dialogRef}
          modalKey={id}
          title={modal?.title || 'Modal title'}
          formId={modal?.props?.formId || ''}
          confirmButtonText={modal?.confirmButtonText || 'submit'}
          cancelButtonText={modal?.cancelButtonText || 'cancel'}
          onCancelForBtn={onCancel}
          onCancel={onCancel}
          onClick={onClick}
        >
          <ModalComponent {...modal?.props} />
        </BaseModal>
      )}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) throw new Error('useModalContext must be used inside ModalProvider');

  return ctx;
};

export default ModalProvider;
