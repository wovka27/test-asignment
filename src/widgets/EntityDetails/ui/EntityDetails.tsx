import type { EntityDetailsProps } from '@widgets/EntityDetails/model';
import Header from '@widgets/Header';

import ContentRow from '@features/content-block';
import Photos from '@features/photos';

import './entity-details.scss';

export const EntityDetails: EntityDetailsProps = ({
  data,
  headerOnRemove,
  headerTitle,
  isHeader = true,
  hideActions,
  photosData,
  headerOnEdit,
  photosOnUpload,
  photosOnRemove,
}) => {
  const Items = () =>
    data.map((item) => (
      <ContentRow hideActions={hideActions} key={item.titleText + item.id} {...item} />
    ));

  return (
    <div className="entity-details container">
      {isHeader && (
        <Header title={headerTitle!} onRemove={headerOnRemove!} onEdit={headerOnEdit!} />
      )}
      <Items />
      {photosData && (
        <Photos
          data={photosData || []}
          title={'Photos'}
          onRemove={photosOnRemove!}
          onUpload={photosOnUpload!}
        />
      )}
    </div>
  );
};
