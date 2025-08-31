import { modalStateConfigMap } from '@app/providers/modal/lib/modalRegistry.ts';
import { useConfirmCloseModal } from '@app/providers/modal/lib/useConfirmCloseModal.ts';

import BackButton from '@features/back-button';

import Button from '@shared/ui/Button';

import './header.scss';

export const Header: React.FC<{
  title: string;
  onEdit: (...args: unknown[]) => void;
  onRemove: () => void;
}> = ({ onEdit, title, onRemove }) => {
  const [remove] = useConfirmCloseModal(modalStateConfigMap.confirm.remove_organization, onRemove);
  const [edit] = useConfirmCloseModal(modalStateConfigMap.edit.edit_name_organization, onEdit);

  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <BackButton />
      <div className="header__actions">
        <Button variant="icon" size="sm" icon="edit" onClick={edit} />
        <Button variant="icon" size="sm" icon="trash" onClick={remove} />
      </div>
    </header>
  );
};
