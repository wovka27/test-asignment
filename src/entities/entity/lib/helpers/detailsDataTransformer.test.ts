import { detailsDataTransformer } from './detailsDataTransformer.ts';
import { describe, expect, it, vi } from 'vitest';

import { FormatHelper } from '@shared/lib/helpers';

vi.mock('@shared/lib/helpers', () => ({
  FormatHelper: {
    formatDate: vi.fn(() => 'formatted-date'),
    formatNumber: vi.fn(() => 'formatted-number'),
  },
}));

describe('detailsDataTransformer', () => {
  it('1. трансформирует объект со строковыми значениями', () => {
    const config = {
      Section1: { Key1: 'Value1' },
    };

    const result = detailsDataTransformer(config);
    expect(result.data[0].data).toEqual([{ label: 'Key1', value: 'Value1' }]);
  });

  it('2. трансформирует объект с функцией как значением', () => {
    const config = {
      Section2: {
        Dynamic: (f: typeof FormatHelper) => f.formatDate('2020-01-01'),
      },
    };

    const result = detailsDataTransformer(config);
    expect(result.data[0].data[0]).toEqual({ label: 'Dynamic', value: 'formatted-date' });
  });

  it('3. поддерживает несколько ключей внутри одной секции', () => {
    const config = {
      Section3: { A: '1', B: '2' },
    };

    const result = detailsDataTransformer(config);
    expect(result.data[0].data).toHaveLength(2);
    expect(result.data[0].data).toContainEqual({ label: 'A', value: '1' });
    expect(result.data[0].data).toContainEqual({ label: 'B', value: '2' });
  });

  it('4. поддерживает несколько секций', () => {
    const config = {
      SectionA: { Key: 'Val' },
      SectionB: { Key: 'Val2' },
    };

    const result = detailsDataTransformer(config);
    expect(result.data).toHaveLength(2);
    expect(result.data.map((x) => x.titleText)).toEqual(['SectionA', 'SectionB']);
  });

  it('5. корректно разделяет title и componentFormRegistryKey', () => {
    const config = {
      'Title|RegistryKey': { X: 'Y' },
    };

    const result = detailsDataTransformer(config);
    expect(result.data[0]).toMatchObject({
      titleText: 'Title',
      componentFormRegistryKey: 'RegistryKey',
    });
  });

  it('6. добавляет initialState, если formDataState передан', () => {
    const config = {
      'Title|Key': { A: '1' },
    };
    const formDataState = {
      Key: { A: 'test' },
    };

    const result = detailsDataTransformer(config, formDataState);
    expect(result.data[0].initialState).toEqual({ A: 'test' });
  });

  it('7. не добавляет initialState, если formDataState не передан', () => {
    const config = {
      'Title|Key': { A: '1' },
    };

    const result = detailsDataTransformer(config);
    expect(result.data[0]).not.toHaveProperty('initialState');
  });

  it('8. initialState undefined, если ключа нет в formDataState', () => {
    const config = {
      'Title|Key': { A: '1' },
    };
    const formDataState = {
      AnotherKey: { B: 'test' },
    };

    const result = detailsDataTransformer(config, formDataState);
    expect(result.data[0].initialState).toBeUndefined();
  });

  it('9. сохраняет порядок секций', () => {
    const config = {
      First: { A: '1' },
      Second: { B: '2' },
      Third: { C: '3' },
    };

    const result = detailsDataTransformer(config);
    expect(result.data.map((x) => x.titleText)).toEqual(['First', 'Second', 'Third']);
  });

  it('10. toArrayOptions работает со смешанными типами значений', () => {
    const config = {
      Mixed: {
        Str: 'simple',
        Fn: (f: typeof FormatHelper) => f.formatNumber(123),
      },
    };

    const result = detailsDataTransformer(config);
    expect(result.data[0].data).toContainEqual({ label: 'Str', value: 'simple' });
    expect(result.data[0].data).toContainEqual({ label: 'Fn', value: 'formatted-number' });
  });
});
