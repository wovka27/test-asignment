import clsx from 'clsx';

import Button from '@shared/ui/Button';
import type { ActionType, SectionContainerProps } from '@shared/ui/SectionContainer/model';

import './section-container.scss';

export const SectionContainer: SectionContainerProps = ({
  children,
  className,
  titleText,
  actions,
  'aria-labelledby': ariaLabelledby,
  isForm,
  ...rest
}) => {
  const Container = !isForm ? 'section' : 'form';
  return (
    <Container
      aria-labelledby={ariaLabelledby}
      className={clsx('section-container', className)}
      {...rest}
    >
      {titleText && (
        <div className={clsx('section-container__header')}>
          <h2 id={ariaLabelledby} className={clsx('section-container__title')}>
            {titleText}
          </h2>
          {actions && (
            <div className={clsx('section-container__header-actions')}>
              <Actions data={actions} />
            </div>
          )}
        </div>
      )}
      <div className={clsx('section-container__body')}>{children}</div>
    </Container>
  );
};

const Actions: React.FC<{ data?: ActionType[] }> = ({ data }) => {
  if (!data?.length) return null;

  return data.map(({ title, icon, onClick, type }) => (
    <Button key={title} variant="outline" size="sm" icon={icon} onClick={onClick} type={type}>
      {title}
    </Button>
  ));
};
