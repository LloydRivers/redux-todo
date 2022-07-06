import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "../features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todoSliceReducer,
  },
});
