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

  const PhotosData = () =>
    photosData ? (
      <Photos
        data={photosData || []}
        title={'Photos'}
        onRemove={photosOnRemove!}
        onUpload={photosOnUpload!}
      />
    ) : null;

  const IsHeader = () =>
    isHeader ? (
      <Header title={headerTitle!} onRemove={headerOnRemove!} onEdit={headerOnEdit!} />
    ) : null;

  return (
    <div className="entity-details container">
      <IsHeader />
      <Items />
      <PhotosData />
    </div>
  );
};
