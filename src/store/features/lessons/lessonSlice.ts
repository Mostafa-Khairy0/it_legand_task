import { Lesson } from "@prisma/client";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  isFulfilled,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { addComments, CommentType } from "../comments";
import { RootState } from "@/store";

export type LessonSlice = Lesson & {
  comments: number[];
};
export type LessonType = Lesson & {
  comments: CommentType[];
};

const lessonAdapter = createEntityAdapter<LessonSlice>();

export const addLessons = createAsyncThunk(
  "lessons/addLessons",
  async (lessons: LessonType[], { dispatch, fulfillWithValue }) => {
    const comments = lessons
      .map((lesson) => lesson?.comments)
      .reduce((acc, comments) => [...(acc ?? []), ...(comments ?? [])], []);
    dispatch(addComments(comments));

    return fulfillWithValue(
      lessons?.map((lesson) => ({
        ...lesson,
        comments: lesson?.comments
          .sort((a, b) =>
            String(a.createdAt).localeCompare(String(b.createdAt))
          )
          .map((comment) => comment.id),
      }))
    );
  }
);

const lessonSlice = createSlice({
  name: "lessons",
  initialState: lessonAdapter.getInitialState(),
  reducers: {
    updateLesson: lessonAdapter.updateOne,
    setLessons: lessonAdapter.setAll,
    addCommentToLesson: (
      state,
      action: PayloadAction<{ id: number; commentId: number }>
    ) => {
      const { id, commentId } = action.payload;
      const lesson = state.entities[id];
      lessonAdapter.updateOne(state, {
        ...lesson,
        changes: {
          comments: [...lesson.comments, commentId],
        },
      });
    },
    removeCommentFromLesson: (
      state,
      action: PayloadAction<{ id: number; commentId: number }>
    ) => {
      const { id, commentId } = action.payload;
      const lesson = state.entities[id];
      lessonAdapter.updateOne(state, {
        ...lesson,
        changes: {
          comments: lesson.comments.filter((id) => id != commentId),
        },
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(addLessons), (state, action) => {
      lessonAdapter.addMany(state, action.payload);
    });
  },
});

export const {
  updateLesson,
  setLessons,
  addCommentToLesson,
  removeCommentFromLesson,
} = lessonSlice.actions;

export const selectLessonById = (id: number) => (state: RootState) =>
  state.lessons.entities[id];
export const lessonReducer = lessonSlice.reducer;

export const selectLessonOrder = (courseId: number, lessonId: number) =>
  createSelector(
    (state: RootState) => state.courses.entities[courseId],
    (state: RootState) => state.units.entities,
    (course, units) => {
      let order = 1;
      if (!course) return order;
      for (const unitId of course?.units)
        if (units[unitId].lessons.includes(lessonId))
          return order + units[unitId].lessons.indexOf(lessonId);
        else order += units[unitId].lessons.length;

      return order;
    }
  );
