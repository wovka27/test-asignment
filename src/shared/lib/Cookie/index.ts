export default class CookieHelper {
  static set(
    name: string,
    value: string,
    options: {
      maxAge?: number;
      path?: string;
      secure?: boolean;
      domain?: string;
      sameSite?: 'Strict' | 'Lax' | 'None';
    } = {}
  ) {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.maxAge && !isNaN(parseInt(options.maxAge.toString()))) {
      cookie += ` max-age=${options.maxAge}`;
    }
    if (options.path) cookie += ` path=${options.path}`;
    if (options.secure) cookie += ` Secure`;
    if (options.domain) cookie += ` domain=${options.domain}`;

    if (options.sameSite)
      cookie += ` SameSite=${options.sameSite.charAt(0).toUpperCase() + options.sameSite.slice(1)}`;

    document.cookie = cookie;
  }

  static get(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${encodeURIComponent(name)}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  }

  static delete(name: string, path = '/') {
    document.cookie = `${encodeURIComponent(name)}=; path=${encodeURIComponent(path)}; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0`;
  }
}
