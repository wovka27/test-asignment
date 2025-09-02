export const fields = [
  {
    type: 'group',
    children: [
      {
        type: 'input',
        name: 'contract.no',
        label: 'Agreement number:',
        props: {
          placeholder: '1624/2-24',
          style: { width: '188.5px' },
        },
      },
      {
        type: 'date',
        name: 'contract.issue_date',
        inline: true,
        label: 'Date:',
        props: {
          style: { width: '188.5px' },
        },
      },
    ],
  },
  {
    type: 'select',
    label: 'Business entity:',
    name: 'businessEntity',
    options: optionsTransformer(['Partnership']),
  },
  {
    type: 'select',
    label: 'Company type:',
    name: 'type',
    options: optionsTransformer(['funeral_home', 'logistics_services', 'burial_care_contractor']),
    props: {
      multiple: true,
    },
  },
];

function optionsTransformer(options: string[]) {
  return options.map((i) => ({
    label: i.charAt(0).toUpperCase(),
    value: i,
  }));
}
