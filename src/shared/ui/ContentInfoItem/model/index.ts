export interface IContentInfoItem {
  label: string;
  htmlFor?: React.HTMLProps<HTMLLabelElement>['htmlFor'];
  text?: string;
  isFormField?: boolean;
  style?: React.CSSProperties;
  inline?: boolean;
}

export type CustomContentInfoItemProps = React.FC<React.PropsWithChildren<IContentInfoItem>>;
