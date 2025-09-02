export class FormatHelper {
  static toPhone(val: string, p: string = '+_ ___ ___ ____'): string {
    val = val.replace(/\D/g, '');

    return ((l, i = 0) =>
      p.replace(/./g, (w) => (/[_\d]/.test(w) && i < l ? val.charAt(i++) : i >= l ? '' : w)))(
      val.length
    );
  }
  static toTitleCase(text: string): string {
    return text.replace(/(^|_)(\w)/g, (_, __, char) => ` ${char.toUpperCase()}`).trim();
  }
  static toCapitalize(arr: string[]): string {
    return arr.map(FormatHelper.toTitleCase).join(', ');
  }
  static toYesNo(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
  static toDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    return new Date(date).toLocaleDateString(
      'default',
      options ?? {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }
    );
  }
}
