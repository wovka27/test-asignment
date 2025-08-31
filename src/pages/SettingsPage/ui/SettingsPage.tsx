import { useState } from 'react';

import FormFieldGenerator from '@shared/ui/FormFieldGenerator';
import type { FormField } from '@shared/ui/FormFieldGenerator/model';
import Input from '@shared/ui/Input';
import SectionContainer from '@shared/ui/SectionContainer';

import './settings-page.scss';

export const SettingsPage = () => {
  const [config] = useState<FormField[]>(JSON.parse(JSON.stringify(fieldsConfig)));
  return (
    <section className="settings-page container">
      <SectionContainer
        isForm
        actions={[
          { title: 'Save changes', type: 'submit', icon: 'check', onClick: () => {} },
          { title: 'Cancel', icon: 'x', onClick: () => {} },
        ]}
        titleText="Main"
      >
        <FormFieldGenerator data={config} />
      </SectionContainer>
      <SectionContainer
        actions={[{ title: 'Edit', icon: 'edit', onClick: () => {} }]}
        titleText="Personal Data"
      >
        <h2>Vladimir Demyanchuk</h2>
        <div className="settings-page__avatar"></div>
      </SectionContainer>
      <SectionContainer
        actions={[{ title: 'Edit', icon: 'edit', onClick: () => {} }]}
        titleText="Settings Security"
      >
        <h2>Vladimir Demyanchuk</h2>
        <div className="settings-page__avatar"></div>
      </SectionContainer>
      <Input type="search"></Input>
    </section>
  );
};

const fieldsConfig: FormField[] = [
  {
    type: 'group',
    children: [
      {
        type: 'input',
        name: 'number',
        label: 'Agreement number:',
        props: {
          placeholder: 'fdhgfdj',
        },
      },
      {
        style: {
          flex: '1',
        },
        type: 'date',
        name: 'date',
        inline: true,
        label: 'Date',
        props: {},
      },
    ],
  },
  {
    type: 'select',
    label: 'hui',
    name: 'cba',
    options: Array.from({ length: 10 }, (_, index) => ({
      value: String(index + 1),
      label: String(index + 1),
    })),
    props: {},
  },
  {
    type: 'select',
    label: 'hui',
    name: 'abc',
    options: Array.from({ length: 10 }, (_, index) => ({
      value: String(index + 1),
      label: String(index + 1),
    })),
    props: {
      multiple: true,
    },
  },
];
