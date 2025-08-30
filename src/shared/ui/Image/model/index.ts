export interface IImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  ref?: React.Ref<HTMLImageElement>;
  loader?: React.ReactNode;
  fallback?: React.ReactNode;
  onLoadComplete?: () => void;
}

export type ImageProps = React.FC<IImage>;

export type ImageState = {
  loaded: boolean;
  error: boolean;
};
