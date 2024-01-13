import { AxiosRequestConfig, CancelTokenSource } from "axios";

export interface ApiParams {
  endpoint: string;
  data?: any;
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  onStart?: string;
  onSuccess?: string;
  onError?: string;
  onFinally?: string;
}

export interface CancelTokenData {
  pending: boolean;
  source: CancelTokenSource;
};
