import { observer } from 'mobx-react';

import type { EntityDetailsProps } from '@widgets/EditableItem/model';
import Header from '@widgets/Header';

import ContentRow from '@features/content-block';
import Photos from '@features/photos';

import { entityComponentFormRegistry } from '@entities/entity/lib/entityComponentFormRegistry.ts';

import './editable-item.scss';

export const EditableItem: EntityDetailsProps = ({
  data,
  headerOnRemove,
  headerTitle,
  isHeader = true,
  hideActions,
  store,
  headerOnEdit,
}) => {
  const Items = () => {
    return data.map((item) => {
      return (
        <ContentRow
          EntityForm={entityComponentFormRegistry[item.componentFormRegistryKey!]}
          hideActions={hideActions}
          key={item.titleText}
          {...item}
        />
      );
    });
  };

  const PhotosSection = () => {
    return store ? <Photos store={store} /> : null;
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
    <div className="editable-item container">
      <IsHeader />
      <Items />
      <PhotosSection />
    </div>
  );
};
