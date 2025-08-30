import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import CookieHelper from '@shared/lib/Cookie';
import type {
  IHttpAxiosRequestConfig,
  IHttpClient,
  IHttpClientFailedQueue,
  IHttpClientOptions,
} from '@shared/lib/HttpClient/model';

export class HttpClient implements IHttpClient {
  private readonly instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: IHttpClientFailedQueue[] = [];

  constructor(public options: IHttpClientOptions) {
    this.instance = axios.create({ withCredentials: true, ...options });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private processQueue(error: unknown) {
    this.failedQueue.forEach((prom) => {
      if (!error) {
        prom.resolve();
      } else {
        prom.reject(error);
      }
    });
    this.failedQueue = [];
  }

  private async refreshToken(): Promise<void> {
    if (!this.options.refreshURL) return;
    await this.instance.post(this.options.refreshURL);
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

        if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve: () => resolve(this.instance(originalRequest!)),
                reject,
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            await this.refreshToken();
            this.processQueue(null);

            this.isRefreshing = false;
            return this.instance(originalRequest!);
          } catch (err) {
            this.processQueue(err);
            this.isRefreshing = false;
            return Promise.reject(err);
          }
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
