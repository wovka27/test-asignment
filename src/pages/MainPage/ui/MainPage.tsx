import { data } from '@pages/MainPage/config/detailsData.ts';

import EntityDetails from '@widgets/EntityDetails';

export const MainPage = () => {
  return (
    <div className="container-flex-column">
      <EntityDetails data={data} isHeader={false} hideActions />
    </div>
  );
};
