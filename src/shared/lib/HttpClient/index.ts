import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import CookieHelper from '@shared/lib/Cookie';
import type {
  IHttpAxiosRequestConfig,
  IHttpClient,
  IHttpClientOptions,
} from '@shared/lib/HttpClient/model';

export class HttpClient implements IHttpClient {
  private readonly instance: AxiosInstance;

  constructor(public options: IHttpClientOptions) {
    this.instance = axios.create({ withCredentials: true, ...options });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor(): void {
    this.instance.interceptors.request.use((config) => {
      const token = CookieHelper.get('token');

      this.options.setAuthenticated?.(!!token);

      if (token) {
        config.headers.Authorization = token;
      }

      return config;
    });
  }

  private initializeResponseInterceptor(): void {
    this.instance.interceptors.response.use(
      (response) => {
        const token = response.headers['authorization'];

        this.options.setAuthenticated?.(!!token);

        if (token) {
          CookieHelper.set('token', token, {
            maxAge: 3600,
            secure: true,
            sameSite: 'Strict',
          });
        }

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest: IHttpAxiosRequestConfig | undefined = error.config;

        if (!originalRequest) {
          return Promise.reject(error);
        }

        if (!originalRequest._retryCount) {
          originalRequest._retryCount = 0;
        }

        const MAX_RETRIES = 10;

        if (!error.response) {
          const code = (error as AxiosError & { code?: string }).code;

          if (code === 'ERR_NETWORK' || code === 'ERR_CONNECTION_CLOSED') {
            console.error('Сетевой сбой:', code, error.message);

            if (originalRequest._retryCount < MAX_RETRIES) {
              originalRequest._retryCount++;
              console.warn(`Network error, retrying... (${originalRequest._retryCount})`);
              return this.instance(originalRequest);
            }

            return Promise.reject(new Error('Проблемы с сетью. Проверьте соединение.'));
          }

          return Promise.reject(new Error(`Неизвестная ошибка: ${error.message}`));
        }

        if (error.response.status === 500) {
          if (originalRequest._retryCount < MAX_RETRIES) {
            originalRequest._retryCount++;
            console.warn(`Server error 500, retrying... (${originalRequest._retryCount})`);
            return this.instance(originalRequest);
          }
          return Promise.reject(new Error('Ошибка сервера (500). Попробуйте позже.'));
        }

        if (error.response?.status === 401) {
          this.options.setAuthenticated?.(false);
        }

        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config);
  }

  public patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.patch<T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, config);
  }
}
