import { useModal } from '@app/providers/modal/lib/useModal.ts';
import type { ModalConfig, ModalType } from '@app/providers/modal/model/types';

export const useConfirmCloseModal = (
  config: ModalConfig<ModalType>,
  cb: <T>(value: T, payload: unknown) => void
) => {
  const { openModal } = useModal();

  const confirm = <T>(payload?: T) => openModal(config).then((v) => cb(v, payload));

  return [confirm] as const;
};
