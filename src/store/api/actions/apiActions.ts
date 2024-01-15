import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse, Method } from 'axios';
import { ApiRequestConfig } from "../models/apiModels";

export const apiCallBegan = createAction<ApiRequestConfig>('api/callBegan');
export const apiCallSuccess = createAction<AxiosResponse>('api/callSuccess');
export const apiCallFail = createAction<AxiosError | AxiosResponse>('api/callFail');
export const apiCallFinish = createAction('api/callFinish');

export const Get = createAsyncThunk("api/get", ( config: ApiRequestConfig, thunkAPI) => {
  const method: Method = "GET";
  const requestParams = { method, ...config };

  return thunkAPI.dispatch(apiCallBegan(requestParams));
});

export const Post = createAsyncThunk("api/post", ( config: ApiRequestConfig, thunkAPI) => {
  const method: Method = "POST";
  const requestParams = { method, ...config };

  return thunkAPI.dispatch(apiCallBegan(requestParams));
});

export const Put = createAsyncThunk("api/put", async ( config: ApiRequestConfig, thunkAPI) => {
  const method: Method = "PUT";
  const requestParams = { method, ...config };

  return thunkAPI.dispatch(apiCallBegan(requestParams));
});

export const Patch = createAsyncThunk("api/patch", ( config: ApiRequestConfig, thunkAPI) => {
  const method: Method = "PATCH";
  const requestParams = { method, ...config };

  return thunkAPI.dispatch(apiCallBegan(requestParams));
});

export const Delete = createAsyncThunk("api/delete", ( config: ApiRequestConfig, thunkAPI) => {
  const method: Method = "DELETE";
  const requestParams = { method, ...config };

  return thunkAPI.dispatch(apiCallBegan(requestParams));
});
