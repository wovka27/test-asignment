import { z } from 'zod/v3';

import Button from '@shared/ui/Button';
import Form from '@shared/ui/Form';
import type { FormField } from '@shared/ui/FormFieldGenerator/model';

const defaultValues = {
  no: '',
  issue_date: '21.03.2025',
  businessEntity: 'q3',
  type: ['q3', 'q4'],
};

const schema = z.object({
  no: z.string(),
  issue_date: z.string(),
  businessEntity: z.string(),
  type: z.any(),
});

const formFields: FormField[] = [
  {
    type: 'input',
    name: 'no',
    label: 'Agreement number:',
    props: {
      placeholder: '1624/2-24',
    },
  },
  {
    type: 'input',
    name: 'issue_date',
    label: 'Date:',
  },
  {
    type: 'select',
    label: 'Business entity:',
    name: 'businessEntity',
    options: [
      { value: 'q1', label: 'q1' },
      { value: 'q2', label: 'q2' },
      { value: 'q3', label: 'q3' },
      { value: 'q4', label: 'q4' },
      { value: 'q5', label: 'q5' },
    ],
  },
  {
    type: 'select',
    label: 'Company type:',
    name: 'type',
    options: [
      { value: 'q1', label: 'q1' },
      { value: 'q2', label: 'q2' },
      { value: 'q3', label: 'q3' },
      { value: 'q4', label: 'q4' },
      { value: 'q5', label: 'q5' },
    ],
    props: {
      multiple: true,
    },
  },
];

export const SettingsPage = () => {
  return (
    <section className="container container-flex-column">
      <Form
        fields={formFields}
        schema={schema}
        defaultValues={defaultValues}
        onSubmit={(a) => {
          console.log(a);
        }}
      >
        <Button type={'submit'}>Submit</Button>
      </Form>
    </section>
  );
};
