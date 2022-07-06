// import useState
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postTodo } from "./todosSlice";

const AddTodoform = () => {
  const [todo, setTodo] = useState("");
  const [completed, setCompleted] = useState(false);
  const [addRequestStatus, setaddRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  const todoTextOnChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const handleCompletedChange = (e) => {
    setCompleted(e.target.checked);
  };

  let canSave = todo !== "" && addRequestStatus === "idle";

  const onSaveTodoClicked = () => {
    if (canSave) {
      try {
        setaddRequestStatus("pending");
        dispatch(postTodo({ text: todo, completed })).unwrap();
        setTodo("");
        setCompleted(false);
      } catch (error) {
        console.log("Failed to save the todo", error);
      } finally {
        setaddRequestStatus("idle");
      }
    }
  };

  return (
    <div>
      Add new todo:
      <form>
        <input type="text" value={todo} onChange={todoTextOnChangeHandler} />
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCompletedChange}
        />
        <button onClick={onSaveTodoClicked}>Save</button>
      </form>
    </div>
  );
};

export default AddTodoform;
