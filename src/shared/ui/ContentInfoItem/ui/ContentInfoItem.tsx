import clsx from 'clsx';

import { isValidUrl } from '@shared/lib/helpers';
import type { CustomContentInfoItemProps } from '@shared/ui/ContentInfoItem/model';

import './content-info-item.scss';

export const ContentInfoItem: CustomContentInfoItemProps = ({
  label,
  htmlFor,
  children,
  text,
  isFormField,
  style,
  inline,
}) => {
  const Label = isFormField ? 'label' : 'div';
  const txt = isValidUrl(text || '') ? (
    <a href={text} target="_blank">
      {text}
    </a>
  ) : (
    text
  );
  return (
    <div
      style={style}
      className={clsx('content-info-item', { 'content-info-item--inline': inline })}
    >
      <Label className="content-info-item__label" htmlFor={htmlFor}>
        {label}
      </Label>
      {children ? children : <p className="content-info-item__text">{txt}</p>}
    </div>
  );
};
