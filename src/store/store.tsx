import { Action, combineReducers, configureStore, Middleware, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";

import posts from "./posts/postsSlice";

import { axiosRestApiMiddleware } from "./api";

const rootReducer = combineReducers({
  posts,
});

const middlewares: Middleware[] = [axiosRestApiMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares as ReturnType<typeof getDefaultMiddleware>),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppMiddlewareDispatch = ThunkDispatch<RootState, unknown, Action>;

export type AppMiddleware = Middleware<{}, RootState, AppMiddlewareDispatch>;

export type AppThunk = ThunkAction<any, RootState, unknown, Action<string>>;
