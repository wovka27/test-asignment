export type IconNameType =
  | 'check'
  | 'x'
  | 'add_photo'
  | 'inventory'
  | 'chevron'
  | 'trash'
  | 'share'
  | 'edit'
  | 'account'
  | 'logout'
  | 'contractor'
  | 'portfolio'
  | 'settings'
  | 'logo';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconNameType;
}
