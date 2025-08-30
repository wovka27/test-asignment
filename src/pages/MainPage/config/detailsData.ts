import { detailsDataTransformer } from '@entities/entityDetails/lib/helpers';

export const data = detailsDataTransformer({
  'About project': {
    Name: 'Test asignment',
    Technologies: 'React, React Router, MobX, SASS, Typescript, Axios',
    Level: 'Middle',
  },
  'The candidate': {
    FIO: 'Демянчук Владимир Юрьевич',
    Email: 'wovka.pb@yandex.ru',
    'Github repository': 'https://github.com/wovka27/test-asignment',
  },
}).data;
