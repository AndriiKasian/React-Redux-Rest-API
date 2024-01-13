import { AxiosError, AxiosResponse } from "axios";
import { isAction } from "@reduxjs/toolkit";
import { AppMiddleware } from "../../store";
import * as actions from "../actions/apiActions";
import AxiosRestApiService from "../services/AxiosRestApiService";
import { ApiRequestConfig } from "../models/apiModels";
import { buildHeaders } from "../utils/buildHeaders";

const axiosRestApiMiddleware: AppMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (isAction(action) && action.type !== actions.apiCallBegan.type) {
      return next(action);
    }

    const { onStart, onSuccess, onError, onFinally, ...requestConfig }: ApiRequestConfig = actions.apiCallBegan.match(
      action
    )
      ? action.payload
      : {};

    // Dispatch specific api call start action
    if (onStart) {
      dispatch({ type: onStart });
    }

    next(action);

    try {
      const axiosRequestConfig = {
        headers: buildHeaders(),
        ...requestConfig,
      };
      const response: AxiosResponse = await AxiosRestApiService.request(axiosRequestConfig);
      // Dispatch common api call success action
      dispatch(actions.apiCallSuccess(response.data));

      // Dispatch specific api call success action
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data });
      }
    } catch (error: any) {
      // Dispatch common api call fail action
      dispatch(actions.apiCallFail(error as AxiosError));

      // Dispatch specific api call error action
      if (onError) {
        dispatch({ type: onError, payload: error.message });
      }
    } finally {
      // Dispatch common api call finish action
      dispatch(actions.apiCallFinish());

      // Dispatch specific api call finally action
      if (onFinally) {
        dispatch({ type: onFinally });
      }
    }
  };

export default axiosRestApiMiddleware;
