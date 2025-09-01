export const formFieldConfigResolver = (state) => {
  return [
    {
      type: 'group',
      children: [
        {
          type: 'input',
          name: 'no',
          label: 'Agreement number:',
          props: {
            style: { maxWidth: '188px' },
            defaultValue: state?.no,
          },
        },
        {
          type: 'input',
          name: 'issue_date',
          inline: true,
          label: 'Date:',
          props: {
            style: { maxWidth: '188px' },
            defaultValue: state?.issue_date,
          },
        },
      ],
    },
    {
      type: 'select',
      label: 'Business entity:',
      name: 'businessEntity',
      options: [state?.businessEntity].map((i) => ({ value: i, label: i })),
      props: {
        required: true,
        defaultValue: state?.businessEntity,
      },
    },
    {
      type: 'select',
      label: 'Company type:',
      name: 'type',
      options: (state?.type || []).map((i) => ({ value: i, label: i })),
      props: {
        required: true,
        multiple: true,
        defaultValue: state?.type,
      },
    },
  ];
};
