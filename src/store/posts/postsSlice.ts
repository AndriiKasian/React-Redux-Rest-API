import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Get } from "../api";
import { AppThunk, RootState } from "../store";

interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

interface PostsState {
  list: Post[];
  loading: boolean;
}

const initialState: PostsState = {
  list: [],
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,

  reducers: {
    postsRequested: (posts) => {
      posts.loading = true;
    },

    postsReceived: (posts, action: PayloadAction<Post[]>) => {
      posts.list = action.payload;
      posts.loading = false;
    },

    postsRequestFailed: (posts) => {
      posts.loading = false;
    },
  },
});

const selfState = (state: RootState) => state.posts;

export const postsSelector = createSelector(
  selfState,
  (state: PostsState) => state.list
);

export const { postsRequested, postsReceived, postsRequestFailed } = postsSlice.actions;

export default postsSlice.reducer;

const url = "https://jsonplaceholder.typicode.com/posts";

export const loadPosts = (): AppThunk => dispatch => {
  return dispatch(
    Get({
      url,
      onStart: postsRequested.type,
      onSuccess: postsReceived.type,
      onError: postsRequestFailed.type,
    })
  );
};

