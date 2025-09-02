import {
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from 'axios';

export interface IHttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

export interface IHttpClientOptions extends CreateAxiosDefaults {
  refreshURL?: string;
  setAuthenticated?: (v: boolean) => void;
}

export interface IHttpClientFailedQueue {
  resolve: () => void;
  reject: <E>(err: E) => void;
}

export interface IHttpAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}
