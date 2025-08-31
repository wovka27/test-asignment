import { useNavigate } from 'react-router-dom';

import SectionContainer from '@shared/ui/SectionContainer';

import './entity-list.scss';

export const EntityList = () => {
  return (
    <div className="container container-flex-column">
      {Array.from({ length: 10 }).map((_, i) => (
        <EntityListItem key={i} />
      ))}
    </div>
  );
};

const EntityListItem = () => {
  const navigate = useNavigate();
  return (
    <SectionContainer
      titleText={'Entity'}
      actions={[{ icon: 'edit', title: 'View', onClick: () => navigate('/companies/12') }]}
    ></SectionContainer>
  );
};
