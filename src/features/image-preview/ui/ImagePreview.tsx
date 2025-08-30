import { useState } from 'react';

import clsx from 'clsx';

import type { ImagePreviewProps } from '@features/image-preview/model';

import Button from '@shared/ui/Button';
import Image from '@shared/ui/Image';

import './image-preview.scss';

export const ImagePreview: ImagePreviewProps = ({ onRemove, src, alt, ...rest }) => {
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false);
  return (
    <div className={clsx('image-preview')}>
      {isShowBtn && (
        <Button
          onClick={onRemove}
          className={clsx('image-preview__btn')}
          variant="filled-icon"
          size="md"
          icon="trash"
        />
      )}
      <Image
        width={144}
        height={108}
        src={src}
        alt={alt}
        onLoadComplete={() => setIsShowBtn(true)}
        {...rest}
      />
    </div>
  );
};
