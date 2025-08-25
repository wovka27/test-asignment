import { iconMap } from '@shared/ui/Icon/config';
import type { IconProps } from '@shared/ui/Icon/model';

export const Icon: React.FC<IconProps> = ({ name, className, ...rest }) => {
  return (
    <svg
      viewBox={name === 'logo' ? '0 0 36 36' : '0 0 20 20'}
      fill="none"
      className={className}
      {...rest}
    >
      {iconMap[name]}
    </svg>
  );
};
