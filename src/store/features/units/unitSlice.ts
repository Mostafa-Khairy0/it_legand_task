import { Unit } from "@prisma/client";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  isFulfilled,
} from "@reduxjs/toolkit";
import { addExams, ExamType } from "../exams";
import { addLessons, LessonType } from "../lessons";
import { RootState } from "@/store";

export type UnitSlice = Unit & { lessons: number[]; examId?: number | null };
export type UnitType = Unit & { lessons: LessonType[]; exam?: ExamType | null };

const unitAdapter = createEntityAdapter<UnitSlice>();

export const addUnits = createAsyncThunk(
  "units/addUnits",
  async (units: UnitType[], { dispatch, fulfillWithValue }) => {
    const exams = units.map((unit) => unit?.exam).filter((exam) => !!exam);
    dispatch(addExams(exams));

    const lessons = units
      .map((unit) => unit?.lessons)
      .reduce((acc, lessons) => [...(acc ?? []), ...(lessons ?? [])], []);
    dispatch(addLessons(lessons));

    return fulfillWithValue(
      units?.map((unit) => ({
        ...unit,
        lessons: unit?.lessons
          ?.sort((a, b) => a.order - b.order)
          ?.map((lesson) => lesson.id),
        examId: unit?.exam?.id,
      }))
    );
  }
);

const unitSlice = createSlice({
  name: "units",
  initialState: unitAdapter.getInitialState(),
  reducers: {
    addUnit: unitAdapter.addOne,
    updateUnit: unitAdapter.updateOne,
    setUnits: unitAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(addUnits), (state, action) => {
      unitAdapter.addMany(state, action.payload);
    });
  },
});

export const selectUnitById = (id: number) => (state: RootState) =>
  state.units.entities[id];
export const { addUnit, updateUnit, setUnits } = unitSlice.actions;
export const unitReducer = unitSlice.reducer;
