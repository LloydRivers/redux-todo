import React from "react";
import TodoList from "./features/todos/TodoList";
import AddTodoForm from "./features/todos/AddTodoForm";

function App() {
  return (
    <div className="App">
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;
