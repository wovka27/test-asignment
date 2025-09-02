import { z } from 'zod/v3';

import type { ModalRegistry, ModalStateConfigMapType } from '@app/providers/modal/model/types';

import ConfirmModal from '@features/confirm-modal';
import EditModal from '@features/edit-modal';

export const modalRegistry: ModalRegistry = {
  confirm: ConfirmModal,
  edit: EditModal,
};

export const modalStateConfigMap: ModalStateConfigMapType = {
  confirm: {
    remove_organization: {
      type: 'confirm',
      title: 'Remove the Organization?',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes, remove',
      props: {
        text: 'Are you sure you want to remove this Organization?',
      },
    },
    remove_photo: {
      type: 'confirm',
      title: 'Remove the photo?',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes, remove',
      props: {
        text: 'Are you sure you want to remove this photo?',
      },
    },
    logout: {
      type: 'confirm',
      title: 'Logout',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      props: {
        text: 'Are you sure you want to logout?',
      },
    },
  },
  edit: {
    edit_name_organization: {
      type: 'edit',
      title: "Specify the Organization's name",
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Save changes',
      schema: z.object({
        name: z.string().min(10, 'Min 10 letters'),
      }),
      props: {
        name: '',
      },
    },
  },
};
