import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export interface QuestionSlice {
  id: number;
  text: string;
  choices: string;
  createdAt: string;
  examId: string;
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

export const { addQuestions, updateQuestion, setQuestions } =
  questionSlice.actions;
export const questionReducer = questionSlice.reducer;
