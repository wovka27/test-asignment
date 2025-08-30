import clsx from 'clsx';

import GrabScrollContainer from '@features/grab-scroll-container';
import ImagePreview from '@features/image-preview';
import type { PhotosProps } from '@features/photos/model';

import SectionContainer from '@shared/ui/SectionContainer';

import './photos.scss';

export const Photos: PhotosProps = ({ title, onUpload, data, onRemove }) => {
  return (
    <SectionContainer
      titleText={title}
      actions={[{ title: 'Add', icon: 'add_photo', onClick: onUpload }]}
    >
      <GrabScrollContainer>
        <div className={clsx('photos__list')}>
          {data.map((i) => (
            <ImagePreview
              src={i.filepath}
              key={i.filepath}
              alt={i.name}
              onRemove={() => onRemove(i)}
            />
          ))}
        </div>
      </GrabScrollContainer>
    </SectionContainer>
  );
};
