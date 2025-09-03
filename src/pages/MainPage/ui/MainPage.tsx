import { data } from '@pages/MainPage/config/detailsData.ts';

import EditableItem from '@widgets/EditableItem';

export const MainPage = () => {
  return (
    <div className="container-flex-column">
      <EditableItem data={data} isHeader={false} hideActions />
    </div>
  );
};
