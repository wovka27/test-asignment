import { useNavigate } from 'react-router-dom';

import Button from '@shared/ui/Button';

export const BackButton = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return <Button className="header__back" variant="icon" size="lg" icon="chevron" onClick={back} />;
};
