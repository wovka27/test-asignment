export interface IContentRow {
  titleText: string;
  hideActions?: boolean;
  onEdit?: (...args: unknown[]) => void;
  data: { label: string; value: string }[];
  id?: string;
}

export type ContentRowProps = React.FC<IContentRow>;
