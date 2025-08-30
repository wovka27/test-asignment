export default class CookieHelper {
  static set(
    name: string,
    value: string,
    options: {
      maxAge?: number;
      path?: string;
      secure?: boolean;
      sameSite?: 'Strict' | 'Lax' | 'None';
    } = {}
  ) {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.maxAge) cookie += `; max-age=${options.maxAge}`;
    if (options.path) cookie += `; path=${options.path}`;
    if (options.secure) cookie += `; Secure`;
    if (options.sameSite) cookie += `; SameSite=${options.sameSite}`;

    document.cookie = cookie;
  }

  static get(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${encodeURIComponent(name)}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  }

  static delete(name: string, path = '/') {
    document.cookie = `${encodeURIComponent(name)}=; path=${path}; max-age=0`;
  }
}
