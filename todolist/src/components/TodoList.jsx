import React from "react";
import { styled } from "@mui/system";
import { List, Typography } from "@mui/material";

import TodoItem from "./TodoItem";
import { TodosContext } from "../contexts/Todos.context";

const CustomListContainer = styled(List)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export default function TodoList() {
  const { todos } = React.useContext(TodosContext);

  const todolistTodisplay = React.Children.toArray(
    todos.map((todo) => <TodoItem todoTask={todo} />)
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
