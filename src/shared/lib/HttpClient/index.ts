import axios, {
  type AxiosError,
  type AxiosInstance,
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
}

export interface IHttpClientFailedQueue {
  resolve: () => void;
  reject: <E>(err: E) => void;
}

export interface IHttpAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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
      return config;
    });
  }

  private initializeResponseInterceptor(): void {
    this.instance.interceptors.response.use(
      (response) => response,
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

  public get<T>(url: string, config?: InternalAxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  public post<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) {
    return this.instance.put<T>(url, data, config);
  }

  public patch<T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) {
    return this.instance.patch<T>(url, data, config);
  }

  public delete<T>(url: string, config?: InternalAxiosRequestConfig) {
    return this.instance.delete<T>(url, config);
  }
}
