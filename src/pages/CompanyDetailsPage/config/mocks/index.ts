import type { IContentRow } from '@features/content-block/model';

export const mockData: IContentRow[] = [
  {
    data: [
      { value: '31432/232-32 432.4.45', label: 'Agreement:' },
      { value: 'fdshjk sdsf  sd', label: 'Business entity:' },
      { value: 'kashfdkghgf dfdsavxcv xgs fada sg hdt', label: 'Company type:' },
    ],
    onEdit: () => {},
    titleText: 'Company',
  },
  {
    data: [
      { value: 'Huev Hui Huevich', label: 'Responsible person:' },
      { value: '78678678678', label: 'Phone number:' },
      { value: 'sdfgdgdgdgds@fdhfg.dfgdhd', label: 'E-mail:' },
    ],
    onEdit: () => {},
    titleText: 'Contacts',
  },
  {
    data: [],
    onEdit: () => {},
    titleText: 'Photos',
  },
];
