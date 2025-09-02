import { useLocation, useNavigate } from 'react-router-dom';

import ContentRow from '@features/content-block';
import mockDataList from '@features/entity-list/config/mocks/mockDataList.json';

import './entity-list.scss';

export const EntityList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (id: string) => () => {
    navigate(`${pathname}/${id}`);
  };
  return (
    <div className="container container-flex-column">
      {mockDataList.map((item) => (
        <EntityListItem
          name={item.name}
          title={item.shortName}
          key={item.id}
          onClick={handleClick(item.id)}
        />
      ))}
    </div>
  );
};

const EntityListItem = ({ title, onClick, name }) => {
  return <ContentRow data={[{ label: 'Name', value: name }]} onEdit={onClick} titleText={title} />;
};
