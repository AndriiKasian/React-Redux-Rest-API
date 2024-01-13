import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse, Method } from 'axios';
import { ApiParams, ApiRequestConfig } from "../models/apiModels";

export const apiCallBegan = createAction<ApiRequestConfig>('api/callBegan');
export const apiCallSuccess = createAction<AxiosResponse>('api/callSuccess');
export const apiCallFail = createAction<AxiosError | AxiosResponse>('api/callFail');
export const apiCallFinish = createAction('api/callFinish');

export const Get = createAsyncThunk(
  'api/get',
  ({ endpoint, ...restParams }: ApiParams, thunkAPI) => {
    const method: Method = 'GET';
    const requestParams = { url: endpoint, method, ...restParams }

    return thunkAPI.dispatch(apiCallBegan(requestParams));
  }
);

export const Post = createAsyncThunk(
  'api/post',
  ({ endpoint, data, ...restParams }: ApiParams, thunkAPI) => {
    const method: Method = 'POST';
    const requestParams = { url: endpoint, method, data, ...restParams }

    return thunkAPI.dispatch(apiCallBegan(requestParams));
  }
);

export const Put = createAsyncThunk(
  'api/put',
  async ({ endpoint, data, ...restParams }: ApiParams, thunkAPI) => {
    const method: Method = 'PUT';
    const requestParams = { url: endpoint, method, data, ...restParams }

    return thunkAPI.dispatch(apiCallBegan(requestParams));
  }
);

export const Patch = createAsyncThunk(
  'api/patch',
  ({ endpoint, data, ...restParams }: ApiParams, thunkAPI) => {
    const method: Method = 'PATCH';
    const requestParams = { url: endpoint, method, data, ...restParams }

    return thunkAPI.dispatch(apiCallBegan(requestParams));
  }
);

export const Delete = createAsyncThunk(
  'api/delete',
  ({ endpoint, ...restParams }: ApiParams, thunkAPI) => {
    const method: Method = 'DELETE';
    const requestParams = { url: endpoint, method, ...restParams }

    return thunkAPI.dispatch(apiCallBegan(requestParams));
  }
);
