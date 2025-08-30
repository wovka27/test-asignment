import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { modalStateConfigMap } from '@app/providers/modal/lib/modalRegistry.ts';
import { useConfirmCloseModal } from '@app/providers/modal/lib/useConfirmCloseModal.ts';

import { authStore } from '@entities/auth/model/auth.store.ts';

import Button from '@shared/ui/Button';

export const LogoutButton = observer(() => {
  const navigate = useNavigate();

  const [logout] = useConfirmCloseModal(modalStateConfigMap.confirm.logout, () => {
    authStore.clear();
    navigate('/login');
  });

  return <Button onClick={logout} variant="filled-icon" icon="logout" />;
});
