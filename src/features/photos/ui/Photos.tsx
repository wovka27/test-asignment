import { useRef, useState } from 'react';

import clsx from 'clsx';

import GrabScrollContainer from '@features/grab-scroll-container';
import ImagePreview from '@features/image-preview';
import type { PhotosProps } from '@features/photos/model';

import SectionContainer from '@shared/ui/SectionContainer';

import './photos.scss';

export const Photos: PhotosProps = ({ onUpload, data, onRemove }) => {
  const [photos, setPhotos] = useState<typeof data>(data);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => inputRef.current?.click();

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      onUpload(formData).then((res) => {
        setPhotos((prevState) => [...prevState, JSON.parse(res.data)]);
      });
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
            {photos.map((i) => (
              <ImagePreview
                src={i.filepath}
                key={i.filepath}
                alt={i.name}
                onRemove={() => onRemove(i)}
              />
            ))}
          </div>
        </GrabScrollContainer>
      </SectionContainer.Body>
    </SectionContainer>
  );
};
