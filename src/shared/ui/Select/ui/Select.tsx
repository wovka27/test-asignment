import React, {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';

import Checkbox from '@shared/ui/Checkbox';
import Icon from '@shared/ui/Icon';
import type { SelectItemProps } from '@shared/ui/Select/model';

import './select.scss';

type Value = string | string[];

interface SelectContextValue {
  multiple: boolean;
  value: Value;
  onSelect: (val: string) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'onChange' | 'value' | 'defaultValue'
  > {
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (val: string | string[]) => void;
  onNativeChange?: React.ChangeEventHandler<HTMLSelectElement>;
  dropdownHeight?: number;
  error?: string;
}

export const Select: React.FC<PropsWithChildren<SelectProps>> & {
  Item: React.FC<SelectItemProps>;
} = ({
  value,
  id,
  defaultValue,
  onChange,
  onNativeChange,
  multiple = false,
  placeholder = 'Select...',
  children,
  dropdownHeight = 300,
  name,
  error,
  ...otherProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);

  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<Value>(() => {
    if (value !== undefined) return value;
    if (defaultValue !== undefined) return defaultValue;
    return multiple ? [] : '';
  });

  const selectedValue: Value = isControlled ? (value as Value) : internalValue;

  const ref = useRef<HTMLDivElement>(null);

  const nativeSelectValue = multiple
    ? Array.isArray(selectedValue)
      ? selectedValue.map(String)
      : []
    : typeof selectedValue === 'string'
      ? selectedValue
      : String(selectedValue ?? '');

  const handleSelect = (val: string) => {
    const valStr = String(val);

    if (multiple) {
      const arr = Array.isArray(selectedValue) ? selectedValue.map(String) : [];
      const exists = arr.includes(valStr);
      const newValue = exists ? arr.filter((v) => v !== valStr) : [...arr, valStr];
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    } else {
      if (!isControlled) setInternalValue(valStr);
      onChange?.(valStr);
      setIsOpen(false);
    }
  };

  const updateDropdownPosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  };

  const renderLabel = () => {
    const childrenArray = React.Children.toArray(children).filter(
      React.isValidElement
    ) as React.ReactElement[];

    if (multiple && Array.isArray(selectedValue) && selectedValue.length) {
      return selectedValue
        .map((val) => {
          const opt = childrenArray.find((child) => String(child.props.value) === String(val));
          return opt ? opt.props.children : val;
        })
        .join(', ');
    }

    if (!multiple && typeof selectedValue === 'string' && selectedValue) {
      const opt = childrenArray.find(
        (child) => String(child.props!.value) === String(selectedValue)
      );
      return opt ? opt.props!.children : selectedValue;
    }

    return placeholder;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    updateDropdownPosition();

    const handleScroll = () => updateDropdownPosition();
    const handleResize = () => updateDropdownPosition();

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => updateDropdownPosition());
    if (ref.current) observer.observe(ref.current);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [isOpen, dropdownHeight]);

  const openDropDown = () => setIsOpen((p) => !p);

  const handleNativeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (multiple) {
      const vals = Array.from(e.target.selectedOptions).map((o) => o.value);
      if (!isControlled) setInternalValue(vals);
      onChange?.(vals);
    } else {
      const v = e.target.value;
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    }

    onNativeChange?.(e);
  };

  return (
    <div id={id ? `${id}-root` : undefined} className="select" ref={ref}>
      <div
        tabIndex={0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={id ? `${id}-dropdown` : 'select-dropdown'}
        className={clsx('select__control', { open: isOpen, 'select__control--error': error })}
        onClick={openDropDown}
      >
        <span className="select__value">{renderLabel()}</span>
        <span className="select__arrow">
          <Icon width={20} height={20} name={`chevron_${isOpen ? 'up' : 'down'}`} />
        </span>
      </div>
      {error && <p className="select__error">{error}</p>}

      <select
        id={id ? `${id}-native` : undefined}
        name={name}
        style={{ display: 'none' }}
        multiple={multiple}
        value={nativeSelectValue}
        onChange={handleNativeChange}
        {...otherProps}
      >
        {React.Children.toArray(children)
          .filter(React.isValidElement)
          .map((child) => {
            const childVal = String((child as React.ReactElement).props!.value);
            return (
              <option key={childVal} value={childVal}>
                {(child as React.ReactElement).props?.children ?? childVal}
              </option>
            );
          })}
      </select>

      {isOpen && (
        <SelectContext.Provider
          value={{
            multiple,
            value: selectedValue,
            onSelect: handleSelect,
          }}
        >
          <div
            role="listbox"
            id={id ? `${id}-dropdown` : 'select-dropdown'}
            aria-multiselectable={multiple}
            className={clsx('select__dropdown', { top: dropUp, bottom: !dropUp })}
            style={{ maxHeight: dropdownHeight }}
          >
            {children}
          </div>
        </SelectContext.Provider>
      )}
    </div>
  );
};

const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  const ctx = useContext(SelectContext);

  if (!ctx) {
    throw new Error('Select.Item must be used inside <Select>');
  }

  const { multiple, value: selected, onSelect } = ctx;

  const isSelected = multiple
    ? Array.isArray(selected) && selected.map(String).includes(String(value))
    : String(selected) === String(value);

  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={clsx('select__option', { selected: isSelected })}
      onClick={(e) => {
        e.preventDefault();
        onSelect(String(value));
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(String(value));
        }
      }}
    >
      {multiple && <Checkbox checked={isSelected} readOnly className="select__checkbox" />}
      {children}
    </div>
  );
};

Select.Item = SelectItem;

export default Select;
