export const formFieldsConfigResolver = (state) => [
  {
    type: 'input',
    name: 'person',
    label: 'Responsible person:',
    props: {
      pattern: '(\\w+)\\s(\\w+)',
      required: true,
      placeholder: 'Firstname Lastname',
      defaultValue: state?.person,
    },
  },
  {
    type: 'input',
    name: 'phone',
    label: 'Phone number:',
    props: {
      required: true,
      minLength: 11,
      placeholder: 'Phone number',
      defaultValue: state?.phone,
    },
  },
  {
    type: 'input',
    name: 'email',
    label: 'E-mail:',
    props: {
      required: true,
      placeholder: 'email',
      defaultValue: state?.email,
    },
  },
];