import React from "react";
import { styled } from "@mui/system";
import { List, Typography } from "@mui/material";

import TodoItem from "./TodoItem";

const CustomListContainer = styled(List)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export default function TodoList({ todolist, deleteTask, updateTask }) {
  const todolistTodisplay = React.Children.toArray(
    todolist.map((todo) => (
      <TodoItem
        todoTask={todo}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    ))
  );
  return (
    <>
      <CustomListContainer>
        <Typography variant="h3" sx={{ margin: "2.5%", color: "#294B29" }}>
          Todo List Items:
        </Typography>
        {todolistTodisplay}
      </CustomListContainer>
    </>
  );
}
