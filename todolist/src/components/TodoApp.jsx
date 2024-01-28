import React, { memo } from "react";
import { styled } from "@mui/system";
import { Paper, AppBar, Toolbar, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import TodosContextProvider from "../contexts/Todos.context";

const StyledContainer = styled(Paper)({
  display: "block",
  height: "100vh",
  backgroundColor: "#EEE6CE",
});

const StyledAppbar = styled(AppBar)({
  backgroundColor: "#50623A",
});

export default memo(function TodoApp() {
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

      <TodosContextProvider>
        <TodoList />
        <TodoForm />
      </TodosContextProvider>
    </StyledContainer>
  );
});
