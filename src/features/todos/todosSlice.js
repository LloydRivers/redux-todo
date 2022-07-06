import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const TODOS_URL = "http://localhost:3500/todos";
const initialState = {
  todos: [],
  status: "idle",
  error: null,
};
// example of a thunk
export const allTodos = createAsyncThunk("todos/allTodos", async () => {
  try {
    const { data } = await axios.get(TODOS_URL);
    return [...data];
  } catch (error) {
    return error.message;
  }
});

export const postTodo = createAsyncThunk("todos/postTodo", async (newTodo) => {
  try {
    const { data } = await axios.post(TODOS_URL, newTodo);
    return data;
  } catch (error) {
    return error.message;
  }
});

export const putTodo = createAsyncThunk(
  "todos/putTodo",
  async (updatedTodo) => {
    try {
      const { data } = await axios.put(
        `${TODOS_URL}/${updatedTodo.id}`,
        updatedTodo
      );
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  try {
    const { data } = await axios.delete(`${TODOS_URL}/${id}`);
    return data.id;
  } catch (error) {
    return error.message;
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    // [allTodos.pending]: (state, action) => {
    //   state.status = "loading";
    // },
    [allTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
      state.status = "success";
    },
    [allTodos.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },

    [postTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
      state.status = "success";
    },
    [postTodo.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },

    [putTodo.fulfilled]: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      state.status = "success";
    },
    [putTodo.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.status = "success";
    },
    [deleteTodo.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
  },
});

export const selectTodos = (state) => state.todos.todos;
export const selectStatus = (state) => state.todos.status;
export const selectError = (state) => state.todos.error;

export default todoSlice.reducer;
