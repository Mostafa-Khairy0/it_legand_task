import { CourseType, deepCopy } from "@/utils";
import type { Course } from "@prisma/client";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  isFulfilled,
  createSelector,
} from "@reduxjs/toolkit";
import { addUnits } from "../units";
import { RootState } from "@/store";

type CourseSlice = Course & { units: number[] };

const courseAdapter = createEntityAdapter<CourseSlice>();

export const addCourses = createAsyncThunk(
  "courses/addCourses",
  async (
    courses: NonNullable<CourseType>[],
    { dispatch, fulfillWithValue }
  ) => {
    const units =
      courses
        .map((course) => course?.units)
        .reduce((acc, units) => [...(acc ?? []), ...(units ?? [])], [])
        ?.filter((unit) => !!unit) ?? [];

    dispatch(addUnits(deepCopy(units)));

    return fulfillWithValue(
      courses?.map((course) => ({
        ...course,
        units: course?.units
          .sort((a, b) => a.order - b.order)
          .map((unit) => unit?.id),
      }))
    );
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: courseAdapter.getInitialState(),
  reducers: {
    updateCourse: courseAdapter.updateOne,
    setCourses: courseAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(addCourses), (state, action) => {
      courseAdapter.addMany(state, action.payload);
    });
  },
});

export const selectCourseById = (id: number) => (state: RootState) =>
  state.courses.entities[id];

export const selectCountOfLessonsInCourse = (courseId: number) =>
  createSelector(
    (state: RootState) => state.courses.entities[courseId],
    (state: RootState) => state.units.entities,
    (course, units) => {
      if (!course) return 0;
      return course.units.reduce((acc, unitId) => {
        if (course.units.includes(unitId)) {
          const unit = units[unitId];
          return acc + (unit?.lessons?.length || 0);
        }
        return acc;
      }, 0);
    }
  );

export const { updateCourse, setCourses } = courseSlice.actions;
export const courseReducer = courseSlice.reducer;
