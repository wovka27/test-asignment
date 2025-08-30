import { useState } from 'react';

import clsx from 'clsx';

import type { ImageProps } from '@shared/ui/Image/model';

import './image.scss';

export const Image: ImageProps = ({
  src,
  alt,
  loader,
  fallback,
  onLoadComplete,
  width,
  height,
  ref,
  ...props
}) => {
  const [status, setStatus] = useState<{ loading: boolean; error: boolean }>({
    loading: true,
    error: false,
  });

  const handleLoad = () => {
    setStatus({ loading: false, error: false });
    onLoadComplete?.();
  };

  const handleError = () => {
    setStatus({ loading: false, error: true });
  };

  if (status.error && fallback) {
    return <div className="image-fallback">{fallback}</div>;
  }

  return (
    <div
      className={clsx('image-container', status)}
      style={{ width: width ?? 'auto', height: height ?? '200px' }}
    >
      {status.loading && (
        <div className="image-loader">{loader ?? <div className="skeleton" />}</div>
      )}

      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={clsx('image', !status.loading && 'fade-in')}
        {...props}
      />
    </div>
  );
};
