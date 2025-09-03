export type IconNameType =
  | 'check'
  | 'x'
  | 'add'
  | 'add_photo'
  | 'inventory'
  | 'chevron'
  | 'chevron_right'
  | 'trash'
  | 'share'
  | 'edit'
  | 'account'
  | 'logout'
  | 'contractor'
  | 'search'
  | 'company'
  | 'settings'
  | 'chevron_down'
  | 'chevron_up'
  | 'logo';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconNameType;
}
