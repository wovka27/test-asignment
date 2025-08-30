export type ModalType = 'confirm' | 'edit';
export type ModalSubTypeMap = {
  confirm: 'remove_organization' | 'remove_photo' | 'logout';
  edit: 'edit_name_organization';
};

export type ModalStateConfigMapType = {
  [K in keyof ModalSubTypeMap]: { [S in ModalSubTypeMap[K]]: ModalConfig<K> };
};

export interface ModalPropsMap {
  confirm: {
    text?: string;
    formId?: string;
  };
  edit: {
    name: string;
    formId?: string;
  };
}

export type ModalRegistry = {
  [K in keyof ModalPropsMap]: React.FC<
    ModalPropsMap[K] & {
      onSubmit?: <T>(data: T) => void;
      onClose?: () => void;
    }
  >;
};

export type ModalStateConfig = {
  type: ModalType;
  title: string;
  cancelButtonText: string;
  confirmButtonText: string;
  props: ModalPropsMap[ModalType];
} | null;

export type ModalConfig<T extends ModalType> = {
  type: T;
  title: string;
  cancelButtonText: string;
  confirmButtonText: string;
  props: ModalPropsMap[T];
};

export interface ModalContextValue {
  openModal: <T extends ModalType>(config: ModalConfig<T>) => Promise<unknown>;
  closeModal: () => void;
}
