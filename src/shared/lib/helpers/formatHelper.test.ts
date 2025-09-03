
import { describe, expect, it } from 'vitest';
import { FormatHelper } from '@shared/lib/helpers/formatHelper.ts';

describe('FormatHelper', () => {
  describe('toPhone', () => {
    it('1. форматирует строку цифр в телефонный номер по умолчанию', () => {
      expect(FormatHelper.toPhone('1234567890')).toBe('+1 234 567 890');
    });

    it('2. игнорирует нецифровые символы', () => {
      expect(FormatHelper.toPhone('(123) 456-7890')).toBe('+1 234 567 890');
    });

    it('3. поддерживает кастомный шаблон', () => {
      expect(FormatHelper.toPhone('9876543210', '(___) ___-____')).toBe('(987) 654-3210');
    });

    it('4. обрезает лишние цифры, если больше чем нужно', () => {
      expect(FormatHelper.toPhone('1234567890123')).toBe('+1 234 567 8901');
    });

    it('5. возвращает пустую строку, если нет цифр', () => {
      expect(FormatHelper.toPhone('abc')).toBe('');
    });
  });

  describe('toTitleCase', () => {
    it('6. преобразует строку с нижним подчеркиванием в Title Case', () => {
      expect(FormatHelper.toTitleCase('hello_world')).toBe('Hello World');
    });

    it('7. корректно обрабатывает строку без нижних подчеркиваний', () => {
      expect(FormatHelper.toTitleCase('test')).toBe('Test');
    });
  });

  describe('toCapitalize', () => {
    it('8. объединяет массив строк в Title Case через запятую', () => {
      expect(FormatHelper.toCapitalize(['hello_world', 'foo_bar'])).toBe('Hello World, Foo Bar');
    });
  });

  describe('toYesNo', () => {
    it("9. возвращает 'Yes' для true", () => {
      expect(FormatHelper.toYesNo(true)).toBe('Yes');
    });

    it("10. возвращает 'No' для false", () => {
      expect(FormatHelper.toYesNo(false)).toBe('No');
    });
  });

  describe('toDate', () => {
    it('11. форматирует дату по умолчанию (дд.мм.гггг или локальный формат)', () => {
      const date = new Date('2023-12-31T00:00:00Z');
      const formatted = FormatHelper.toDate(date);
      expect(formatted).toMatch(/\d{1,2}.\d{1,2}.\d{4}/); // общий паттерн
    });

    it('12. применяет кастомные опции форматирования', () => {
      const date = '2023-01-01';
      const formatted = FormatHelper.toDate(date, { month: 'long', year: 'numeric' });
      expect(formatted).toMatch(/2023/);
    });
  });
});
