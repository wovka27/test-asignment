import { useState } from 'react';

import Checkbox from '@shared/ui/Checkbox';
import ContentInfoItem from '@shared/ui/ContentInfoItem';
import type { FormField, FormFieldGeneratorType } from '@shared/ui/FormFieldGenerator/model';
import Input from '@shared/ui/Input';
import Select from '@shared/ui/Select';

import './form-field-generator.scss';

export const FormFieldGenerator: FormFieldGeneratorType = ({ data }) => {
  const [formValues, setFormValues] = useState<Record<string | number | readonly string[]>>(
    Object.create(null)
  );

  function handleChange<T>(name: string, value: T) {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  return data.map((item, index) => {
    if (item.type === 'group') {
      return (
        <div key={index} className="form-field-generator__group">
          <FormFieldGenerator data={item.children} />
        </div>
      );
    }

    switch (item.type) {
      case 'date':
      case 'textarea':
      case 'datetime':
      case 'input':
        return (
          <ContentInfoItem
            isFormField
            htmlFor={item.name}
            key={item.name}
            inline={item.inline}
            label={item.label}
          >
            <Input
              id={item.name}
              name={item.name}
              type={item.type}
              {...item.props}
              value={formValues[item.name]}
              onChange={(event) => handleChange(item.name, event.target.value)}
            />
          </ContentInfoItem>
        );
      case 'checkbox':
        return (
          <ContentInfoItem
            isFormField
            htmlFor={item.name}
            key={item.name}
            inline={item.inline}
            label={item.label}
          >
            <Checkbox
              id={item.name}
              name={item.name}
              {...item.props}
              value={formValues[item.name]}
              onChange={(v) => handleChange(item.name, v)}
            />
          </ContentInfoItem>
        );
      case 'select':
        return (
          <ContentInfoItem
            isFormField
            htmlFor={item.name}
            key={item.name}
            inline={item.inline}
            label={item.label}
          >
            <Select
              id={item.name}
              name={item.name}
              {...item.props}
              value={formValues[item.name]}
              onChange={(v) => handleChange(item.name, v)}
            >
              {item.options.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select>
          </ContentInfoItem>
        );
      default:
        return null;
    }
  });
};
