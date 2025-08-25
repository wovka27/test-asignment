import Button from '@shared/ui/Button';
import Icon from '@shared/ui/Icon';

export const MainPage = () => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Icon name="chevron" />
        <Icon name="contractor" />
        <Icon name="logo" />
        <Icon name="account" />
        <Icon name="check" />
        <Icon name="inventory" />
        <Icon name="logout" />
        <Icon name="add_photo" />
        <Icon name="edit" />
        <Icon name="settings" />
        <Icon name="share" />
        <Icon name="trash" />
        <Icon name="portfolio" />
        <Icon name="x" />
      </div>
      <div>
        <Button isLoading>HUI</Button>
      </div>
    </>
  );
};
