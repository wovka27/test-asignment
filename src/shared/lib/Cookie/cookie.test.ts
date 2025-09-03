import { beforeEach, describe, expect, it } from 'vitest';

import CookieHelper from '@shared/lib/Cookie/index.ts';

describe('CookieHelper', () => {
  beforeEach(() => {
    document.cookie.split(';').forEach((c) => {
      const eqPos = c.indexOf('=');
      const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
      if (name) {
        document.cookie = `${name}=; max-age=0`;
      }
    });
  });

  it('1. устанавливает и получает cookie', () => {
    CookieHelper.set('token', 'abc123');
    expect(CookieHelper.get('token')).toBe('abc123');
  });

  it('2. возвращает null, если cookie нет', () => {
    expect(CookieHelper.get('not_exist')).toBeNull();
  });

  it('3. корректно удаляет cookie', () => {
    CookieHelper.set('session', 'xyz');
    CookieHelper.delete('session');
    expect(CookieHelper.get('session')).toBeNull();
  });

  it('4. устанавливает cookie с maxAge', () => {
    CookieHelper.set('user', 'john', { maxAge: 3600 });
    expect(document.cookie).toContain('max-age=3600');
  });

  it('5. устанавливает cookie с path', () => {
    CookieHelper.set('pathTest', 'ok', { path: '/test' });
    expect(document.cookie).toContain('path=/test');
  });

  it('6. устанавливает cookie с secure', () => {
    CookieHelper.set('secureTest', 'yes', { secure: true });
    expect(document.cookie).toContain('Secure');
  });

  it('7. устанавливает cookie с SameSite=Strict', () => {
    CookieHelper.set('samesite', 'strict', { sameSite: 'Strict' });
    expect(document.cookie).toContain('SameSite=Strict');
  });

  it('8. корректно кодирует и декодирует специальные символы', () => {
    CookieHelper.set('email', 'test+user@example.com');
    expect(CookieHelper.get('email')).toBe('test+user@example.com');
  });

  it('9. удаляет cookie с кастомным path', () => {
    CookieHelper.set('custom', 'val', { path: '/custom' });
    CookieHelper.delete('custom', '/custom');
    expect(CookieHelper.get('custom')).toBeNull();
  });

  it('10. перезаписывает значение cookie', () => {
    CookieHelper.set('dup', 'first');
    CookieHelper.set('dup', 'second');
    expect(CookieHelper.get('dup')).toBe('second');
  });
});
