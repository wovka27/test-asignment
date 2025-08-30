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

interface SelectContextValue {
  multiple: boolean;
  value: string | string[];
  onSelect: (val: string) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  dropdownHeight?: number;
}

export const Select: React.FC<PropsWithChildren<SelectProps>> & {
  Item: React.FC<SelectItemProps>;
} = ({
  value,
  id,
  defaultValue,
  onChange,
  multiple = false,
  placeholder = 'Select...',
  children,
  dropdownHeight = 300,
  ...otherProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [internalValue, setInternalValue] = useState<string | string[]>(
    value ?? defaultValue ?? (multiple ? [] : '')
  );
  const ref = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const handleSelect = (val: string) => {
    if (multiple) {
      const arr = Array.isArray(selectedValue) ? selectedValue : [];
      const newValue = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    } else {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
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
    if (multiple && Array.isArray(selectedValue) && selectedValue.length) {
      return selectedValue
        .map((val) => {
          const opt = React.Children.toArray(children).find((child) => child.props.value === val);
          return opt ? opt.props.children : val;
        })
        .join(', ');
    }
    if (!multiple && typeof selectedValue === 'string' && selectedValue) {
      const opt = React.Children.toArray(children).find(
        (child) => child.props.value === selectedValue
      );
      return opt ? opt.props.children : selectedValue;
    }
    return placeholder;
  };

  const isSelected = (val: string | number) => {
    if (multiple) {
      return Array.isArray(selectedValue) && selectedValue.includes(String(val));
    }
    return selectedValue === String(val);
  };

  const openDropDown = () => setIsOpen((p) => !p);

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

  return (
    <div id={id} className="select" ref={ref}>
      <div
        tabIndex={0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="select-dropdown"
        className={clsx('select__control', { open: isOpen })}
        onClick={openDropDown}
      >
        <span className="select__value">{renderLabel()}</span>
        <span className="select__arrow">
          <Icon width={20} height={20} name={`chevron_${isOpen ? 'up' : 'down'}`} />
        </span>
      </div>

      <select
        id={id}
        name={otherProps.name}
        style={{ display: 'none' }}
        multiple={multiple}
        value={value}
        onChange={(e) => {
          console.log(e.target.selectedOptions);
          if (multiple) {
            const vals = Array.from((e.target as HTMLSelectElement).selectedOptions).map(
              (o) => o.value
            );
            if (!isControlled) setInternalValue(vals);
            onChange?.(vals);
          } else {
            const v = (e.target as HTMLSelectElement).value;
            if (!isControlled) setInternalValue(v);
            onChange?.(v);
          }
        }}
      >
        {React.Children.toArray(children).map((child) => {
          const childVal = String(child.props.value);
          return (
            <option key={childVal} value={childVal}>
              {child.props.children ?? childVal}
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
            id="select-dropdown"
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
    ? Array.isArray(selected) && selected.includes(value)
    : selected === value;

  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={clsx('select__option', { selected: isSelected })}
      onClick={() => onSelect(value)}
    >
      {multiple && <Checkbox checked={isSelected} readOnly className="select__checkbox" />}
      {children}
    </div>
  );
};

Select.Item = SelectItem;

export default Select;
