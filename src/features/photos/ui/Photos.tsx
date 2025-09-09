import { type ChangeEvent, useCallback, useRef } from 'react';

import { observer } from 'mobx-react';

import { modalStateConfigMap } from '@app/providers/modal/lib/modalRegistry.ts';
import { useConfirmCloseModal } from '@app/providers/modal/lib/useConfirmCloseModal.ts';

import GrabScrollContainer from '@features/grab-scroll-container';
import ImagePreview from '@features/image-preview';

import type EntityStore from '@entities/entity/model/entity.store.ts';

import SectionContainer from '@shared/ui/SectionContainer';

import './photos.scss';

export const Photos: React.FC<{ store: InstanceType<typeof EntityStore> }> = observer(
  ({ store }) => {
    const [removePhoto] = useConfirmCloseModal(
      modalStateConfigMap.confirm.remove_photo,
      (_, payload) => {
        store.deleteImage(payload.name);
      }
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    const remove = useCallback(removePhoto, [removePhoto]);

    const onClick = () => inputRef.current?.click();

    const onFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        await store.addImage(formData);
      }
    };
    return (
      <SectionContainer>
        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          name="file"
          onChange={onFileSelect}
        />
        <SectionContainer.Header titleText={'Photos'}>
          <SectionContainer.Actions data={[{ title: 'Add', icon: 'add_photo', onClick }]} />
        </SectionContainer.Header>
        <ImagePreviewList list={store.images} onRemove={remove} />
      </SectionContainer>
    );
  }
);

const ImagePreviewList: React.FC<{
  list: InstanceType<typeof EntityStore>['list'][number]['photos'];
  onRemove: (item: InstanceType<typeof EntityStore>['list'][number]['photos'][number]) => void;
}> = ({ list, onRemove }) => {
  const remove = useCallback(
    (i: Parameters<typeof onRemove>[number]) => () => onRemove(i),
    [onRemove]
  );

  if (!list.length) return null;

  return (
    <SectionContainer.Body>
      <GrabScrollContainer className="photos__list">
        {list.map((i, index) => (
          <ImagePreview
            src={i.filepath}
            key={i.filepath + index + i.filepath + i.createdAt}
            alt={i.name}
            onRemove={remove(i)}
          />
        ))}
      </GrabScrollContainer>
    </SectionContainer.Body>
  );
};
