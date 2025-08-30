import type { IImage } from '@shared/ui/Image/model';

interface ImagePreview extends IImage {
  onRemove?: () => void | Promise<void>;
}

export type ImagePreviewProps = React.FC<ImagePreview>;
