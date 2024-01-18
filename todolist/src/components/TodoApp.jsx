import React, { useState } from "react";
import { styled } from "@mui/system";
import { Paper, AppBar, Toolbar, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

// 294B29, 50623A, 789461
const StyledContainer = styled(Paper)({
  display: "block",
  height: "100vh",
  backgroundColor: "#EEE6CE",
});

const StyledAppbar = styled(AppBar)({
  backgroundColor: "#50623A",
});

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 0, task: "Wash the dishes", isCompleted: false },
    { id: 1, task: "Do Work Daily Routine", isCompleted: false },
    { id: 2, task: "Buy watch", isCompleted: false },
  ]);

  const addTask = (task) => {
    setTodos(() => [
      ...todos,
      { id: todos.length, task: task, isCompleted: false },
    ]);
  };

  const deleteTask = (itemId) => {
    const item = todos.findIndex((todoItem) => todoItem.id === itemId);
    todos.splice(item, 1);
    setTodos(() => [...todos]);
  };

  const updateTask = (task) => {
    const taskIdx = todos.findIndex((todoItem) => todoItem.id === task.id);
    todos.splice(taskIdx, 1, task);
    setTodos(() => [...todos]);
  };

  return (
    <StyledContainer elevation={0}>
      <StyledAppbar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <FavoriteBorderIcon sx={{ verticalAlign: "-5px" }} /> Just Another
            React Todo App{" "}
          </Typography>
        </Toolbar>
      </StyledAppbar>

      <TodoList
        todolist={todos}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
      <TodoForm addTask={addTask} />
    </StyledContainer>
  );
}
