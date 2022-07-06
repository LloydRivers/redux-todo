import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodos,
  selectStatus,
  selectError,
  allTodos,
  putTodo,
  deleteTodo,
} from "./todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [refetch, setRefetch] = useState(false);

  const handleChecked = (todo) => {
    console.log(typeof todo.completed);
    dispatch(
      putTodo({
        ...todo,
        completed: !todo.completed,
      })
    );
  };

  const handleDelete = (id) => {
    setRefetch(true);
    dispatch(deleteTodo(id));
  };

  let content;
  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "success") {
    content = (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.text}</p>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleChecked(todo)}
            />
            <button onClick={() => handleDelete(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    );
  } else if (status === "error") {
    content = <div>Error: {error}</div>;
  }
  useEffect(() => {
    if (status === "idle") {
      dispatch(allTodos());
    }
  }, [dispatch, status, refetch]);
  return (
    <div>
      <h1>TODOS: </h1>
      {content}
    </div>
  );
};

export default TodoList;
