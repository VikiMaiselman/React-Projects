import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { Paper, AppBar, Toolbar, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import useTodosState from "../hooks/useTodosState";

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
  const initialTodos = JSON.parse(window.localStorage.getItem("todos")) || [
    { id: 0, task: "Wash the dishes", isCompleted: false },
    { id: 1, task: "Do Work Daily Routine", isCompleted: false },
    { id: 2, task: "Buy watch", isCompleted: false },
  ];
  const { todos, addTask, deleteTask, updateTask } =
    useTodosState(initialTodos);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
