import { data } from '@pages/MainPage/config/detailsData.ts';

import EntityDetails from '@widgets/EntityDetails';

export const MainPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <EntityDetails data={data} isHeader={false} hideActions />
    </div>
  );
};
