import clsx from 'clsx';

import { useGrabScroll } from '@features/grab-scroll-container/hook/useGrabScroll.ts';
import type { GrabScrollContainerProps } from '@features/grab-scroll-container/model';

import './grab-scroll-container.scss';

export const GrabScrollContainer: GrabScrollContainerProps = ({
  children,
  className,
  wheelEvent,
  ...rest
}) => {
  const ref = useGrabScroll({ wheelEvent });

  return (
    <div ref={ref} className={clsx('grab-scroll-container', className)} {...rest}>
      {children}
    </div>
  );
};
