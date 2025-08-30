import { useModalContext } from '@app/providers/modal/ui/ModalProvider.tsx';

export const useModal = () => {
  const { openModal, closeModal } = useModalContext();
  return { openModal, closeModal };
};
