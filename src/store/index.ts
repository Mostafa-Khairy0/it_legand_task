import {
  commentReducer,
  courseReducer,
  examReducer,
  lessonReducer,
  questionReducer,
  unitReducer,
  userReducer,
} from "./features";

import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      comments: commentReducer,
      courses: courseReducer,
      exams: examReducer,
      lessons: lessonReducer,
      questions: questionReducer,
      units: unitReducer,
      users: userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export * from "./features";
