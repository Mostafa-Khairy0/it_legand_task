import { UserAnswer } from "@prisma/client";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const userAnswerAdapter = createEntityAdapter<UserAnswer>();

const userAnswerSlice = createSlice({
  name: "userAnswers",
  initialState: userAnswerAdapter.getInitialState(),
  reducers: {
    addUserAnswer: userAnswerAdapter.addOne,
    updateUserAnswer: userAnswerAdapter.updateOne,
    setUserAnswers: userAnswerAdapter.setAll,
  },
});

export const { addUserAnswer, updateUserAnswer, setUserAnswers } =
  userAnswerSlice.actions;
export const userAnswerReducer = userAnswerSlice.reducer;
