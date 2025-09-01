import type { EntityDetailsProps } from '@widgets/EntityDetails/model';
import Header from '@widgets/Header';

import ContentRow from '@features/content-block';
import Photos from '@features/photos';

import { entityComponentFormRegistry } from '@entities/entityDetails/config';

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
  const Items = () => {
    return data.map((item) => (
      <ContentRow
        EntityForm={entityComponentFormRegistry[item.componentFormRegistryKey!]}
        hideActions={hideActions}
        key={item.titleText}
        {...item}
      />
    ));
  };

  const PhotosSection = () => {
    return photosData ? (
      <Photos
        data={photosData || []}
        title={'Photos'}
        onRemove={photosOnRemove!}
        onUpload={photosOnUpload!}
      />
    ) : null;
  };

  const IsHeader = () => {
    return isHeader ? (
      <Header
        title={headerTitle!}
        onRemove={headerOnRemove!}
        onEdit={headerOnEdit!}
        initialState={{ name: headerTitle || '' }}
      />
    ) : null;
  };

  return (
    <div className="entity-details container">
      <IsHeader />
      <Items />
      <PhotosSection />
    </div>
  );
};
