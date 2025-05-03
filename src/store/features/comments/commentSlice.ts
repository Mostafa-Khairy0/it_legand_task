import { Comment } from "@prisma/client";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  isFulfilled,
} from "@reduxjs/toolkit";
import { addUsers, UserSlice } from "../users";
import {
  addCommentToLesson,
  removeCommentFromLesson,
  RootState,
} from "@/store";

export type CommentSlice = Comment;
export type CommentType = Comment & { user: UserSlice };

const commentAdapter = createEntityAdapter<CommentSlice>();

export const addComments = createAsyncThunk(
  "comments/addComments",
  async (comments: CommentType[], { dispatch, fulfillWithValue }) => {
    const users = comments.map((comment) => comment?.user);
    dispatch(addUsers(users));

    return fulfillWithValue(
      comments?.map((comment) => ({
        ...comment,
        user: undefined,
      }))
    );
  }
);

export const addOneComment = createAsyncThunk(
  "comments/addOneComment",
  async (
    { lessonId, comment }: { comment: CommentSlice; lessonId: number },
    { dispatch, fulfillWithValue }
  ) => {
    console.log(comment);
    dispatch(
      addCommentToLesson({
        id: lessonId,
        commentId: comment.id,
      })
    );
    return fulfillWithValue([comment]);
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async (
    { lessonId, commentId }: { commentId: number; lessonId: number },
    { dispatch, fulfillWithValue }
  ) => {
    dispatch(
      removeCommentFromLesson({
        id: lessonId,
        commentId,
      })
    );
    return fulfillWithValue([commentId]);
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: commentAdapter.getInitialState(),
  reducers: {
    updateComment: commentAdapter.updateOne,
    setComments: commentAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled(addComments, addOneComment), (state, action) => {
        commentAdapter.addMany(state, action.payload);
      })
      .addMatcher(isFulfilled(removeComment), (state, action) => {
        commentAdapter.removeMany(state, action.payload);
      });
  },
});

export const selectCommentById = (id: number) => (state: RootState) =>
  state.comments.entities[id];

export const { updateComment, setComments } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
