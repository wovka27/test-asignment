import clsx from 'clsx';

import Button from '@shared/ui/Button';
import type {
  SectionContainerActionsProps,
  SectionContainerBodyProps,
  SectionContainerHeaderProps,
  SectionContainerProps,
} from '@shared/ui/SectionContainer/model';

import './section-container.scss';

const SectionContainer: SectionContainerProps = ({ children, className, ...rest }) => {
  return (
    <div className={clsx('section-container', className)} {...rest}>
      {children}
    </div>
  );
};

const Header: SectionContainerHeaderProps = ({ children, titleText }) => {
  if (!titleText) return null;

  return (
    <div className={clsx('section-container__header')}>
      <h2 className={clsx('section-container__title')}>{titleText}</h2>
      {children}
    </div>
  );
};

const Body: SectionContainerBodyProps = ({ children }) => {
  return <div className={clsx('section-container__body')}>{children}</div>;
};

const Actions: SectionContainerActionsProps = ({ data }) => {
  if (!data?.length) return null;

  return (
    <div className={clsx('section-container__header-actions')}>
      {data.map(({ title, icon, onClick, type }) => (
        <Button key={title} variant="outline" size="sm" icon={icon} onClick={onClick} type={type}>
          {title}
        </Button>
      ))}
    </div>
  );
};

SectionContainer.Header = Header;
SectionContainer.Actions = Actions;
SectionContainer.Body = Body;

export default SectionContainer;
