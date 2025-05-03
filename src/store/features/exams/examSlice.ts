import { Exam } from "@prisma/client";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  isFulfilled,
} from "@reduxjs/toolkit";
import { addQuestions, QuestionSlice } from "../questions";
import { RootState } from "@/store";

export type ExamSlice = Exam & { questions: number[] };
export type ExamType = Exam & { questions: QuestionSlice[] };

const examAdapter = createEntityAdapter<ExamSlice>();

export const addExams = createAsyncThunk(
  "exams/addExams",
  async (exams: ExamType[], { dispatch, fulfillWithValue }) => {
    const questions = exams
      .map((exam) => exam?.questions)
      .reduce((acc, questions) => [...(acc ?? []), ...(questions ?? [])], []);

    dispatch(addQuestions(questions));

    return fulfillWithValue(
      exams?.map((exam) => ({
        ...exam,
        questions: exam?.questions.map((question) => question.id),
      }))
    );
  }
);

const examSlice = createSlice({
  name: "exams",
  initialState: examAdapter.getInitialState(),
  reducers: {
    updateExam: examAdapter.updateOne,
    setExams: examAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(addExams), (state, action) => {
      examAdapter.addMany(state, action.payload);
    });
  },
});

export const { updateExam, setExams } = examSlice.actions;
export const examReducer = examSlice.reducer;

export const selectExamById = (id: number) => (state: RootState) =>
  state.exams.entities[id];
