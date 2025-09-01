import { observer } from 'mobx-react';
import { Controller, get, useFormContext } from 'react-hook-form';

import Checkbox from '@shared/ui/Checkbox';
import ContentInfoItem from '@shared/ui/ContentInfoItem';
import type { FormFieldGeneratorType } from '@shared/ui/FormFieldGenerator/model';
import Input from '@shared/ui/Input';
import Select from '@shared/ui/Select';

import './form-field-generator.scss';

export const FormFieldGenerator: FormFieldGeneratorType = observer(({ data }) => {
  const { control, formState } = useFormContext();

  return data.map((item, index) => {
    if (item.type === 'group') {
      return (
        <div key={index} className="form-field-generator__group">
          <FormFieldGenerator data={item.children} />
        </div>
      );
    }

    const error: string | undefined = get(formState.errors, item.name)?.message;

    return (
      <Controller
        key={item.name}
        name={item.name}
        control={control}
        render={({ field }) => {
          switch (item.type) {
            case 'date':
            case 'textarea':
            case 'datetime':
            case 'input':
              return (
                <ContentInfoItem
                  isFormField
                  htmlFor={item.name}
                  inline={item.inline}
                  label={item.label}
                  style={item.style}
                >
                  <Input error={error} id={item.name} type={item.type} {...field} {...item.props} />
                </ContentInfoItem>
              );
            case 'checkbox':
              return (
                <ContentInfoItem
                  isFormField
                  htmlFor={item.name}
                  inline={item.inline}
                  label={item.label}
                >
                  <Checkbox
                    error={error}
                    id={item.name}
                    checked={field.value}
                    {...field}
                    {...item.props}
                  />
                </ContentInfoItem>
              );
            case 'select':
              return (
                <ContentInfoItem
                  isFormField
                  htmlFor={item.name}
                  inline={item.inline}
                  label={item.label}
                >
                  <Select
                    error={error}
                    id={item.name}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                    {...item.props}
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
        }}
      />
    );
  });
});
