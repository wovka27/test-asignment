import { useRef } from 'react';

import clsx from 'clsx';
import { observer } from 'mobx-react';

import GrabScrollContainer from '@features/grab-scroll-container';
import ImagePreview from '@features/image-preview';

import type EntityStore from '@entities/entity/model/entity.store.ts';

import SectionContainer from '@shared/ui/SectionContainer';

import './photos.scss';
import { useConfirmCloseModal } from '@app/providers/modal/lib/useConfirmCloseModal.ts';
import { modalStateConfigMap } from '@app/providers/modal/lib/modalRegistry.ts';

export const Photos: React.FC<{ store: InstanceType<typeof EntityStore> }> = observer(
  ({ store }) => {
    const [removePhoto] = useConfirmCloseModal(
      modalStateConfigMap.confirm.remove_photo,
      (_, { name }) => {

        store.deleteImage(name);
      }
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onClick = () => inputRef.current?.click();

    const onFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        await store.addImage(formData);
      }
    };
    return (
      <SectionContainer>
        <SectionContainer.Header titleText={'Photos'}>
          <SectionContainer.Actions data={[{ title: 'Add', icon: 'add_photo', onClick }]} />
        </SectionContainer.Header>
        <SectionContainer.Body>
          <input
            ref={inputRef}
            className="visually-hidden"
            type="file"
            name="file"
            onChange={onFileSelect}
          />
          <GrabScrollContainer>
            <div className={clsx('photos__list')}>
              {store.images.map((i, index) => (
                <ImagePreview
                  src={i.filepath}
                  key={i.filepath + index + i.filepath + i.createdAt}
                  alt={i.name}
                  onRemove={() => removePhoto(i)}
                />
              ))}
            </div>
          </GrabScrollContainer>
        </SectionContainer.Body>
      </SectionContainer>
    );
  }
);
