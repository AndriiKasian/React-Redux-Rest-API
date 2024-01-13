import axios, {
    AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios';

class AxiosRestApiService {

  private static instance: AxiosRestApiService;

  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create();
  }

  public static getInstance(): AxiosRestApiService {
    if (!AxiosRestApiService.instance) {
      AxiosRestApiService.instance = new AxiosRestApiService();
    }

    return AxiosRestApiService.instance;
  }

  async request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    try {
      return await this.http.request<T, R, D>(config);
    } catch (error) {
      return AxiosRestApiService.handleError(error);
    }
  }

  private static isAxiosError(value: any): value is AxiosError {
    return typeof value?.response === 'object';
  }

  private static handleError(error: unknown): never {
    if (error instanceof Error) {
      if (AxiosRestApiService.isAxiosError(error)) {
        if (error.response) {
          throw error.response;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          throw error.request;
        } else {
          throw error;
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(error?.message || error as any);
      }
    }
    throw new Error(error as any);
  }
}

export default AxiosRestApiService.getInstance();
