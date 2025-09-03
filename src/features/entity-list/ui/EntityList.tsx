import { useLocation, useNavigate } from 'react-router-dom';

import ContentRow from '@features/content-block';

import type { ICompany } from '@entities/companies/model';

import './entity-list.scss';

export function EntityList<T extends ICompany>({ list }: { list: T[] }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (id: string) => () => {
    navigate(`${pathname}/${id}`);
  };

  console.log(JSON.parse(JSON.stringify(list)));
  return (
    <div className="container container-flex-column">
      {list.map((item) => (
        <EntityListItem
          name={item.name!}
          title={item.shortName}
          key={item.id + item.shortName + item.name!}
          onClick={handleClick(item.id!)}
        />
      ))}
    </div>
  );
}

const EntityListItem = ({
  title,
  onClick,
  name,
}: {
  title: string;
  onClick: () => void;
  name: string;
}) => {
  return <ContentRow data={[{ label: 'Name', value: name }]} onEdit={onClick} titleText={title} />;
};
