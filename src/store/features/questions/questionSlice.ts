import { RootState } from "@/store";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export interface QuestionSlice {
  id: number;
  text: string;
  choices: string[];
  createdAt: string;
  examId: number;
  selected?: string;
}

const questionAdapter = createEntityAdapter<QuestionSlice>();

const questionSlice = createSlice({
  name: "questions",
  initialState: questionAdapter.getInitialState(),
  reducers: {
    addQuestions: questionAdapter.addMany,
    updateQuestion: questionAdapter.updateOne,
    setQuestions: questionAdapter.setAll,
  },
});
export const selectQuestionById = (id: number) => (state: RootState) =>
  state.questions.entities[id];

export const { addQuestions, updateQuestion, setQuestions } =
  questionSlice.actions;
export const questionReducer = questionSlice.reducer;
