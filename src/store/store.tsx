import { Action, configureStore, Middleware, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { axiosRestApiMiddleware } from "./api";

const middlewares: Middleware[] = [
  axiosRestApiMiddleware,
];

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(middlewares as ReturnType<typeof getDefaultMiddleware>)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppMiddlewareDispatch = ThunkDispatch<RootState, unknown, Action>;

export type AppMiddleware = Middleware<{}, RootState, AppMiddlewareDispatch>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
