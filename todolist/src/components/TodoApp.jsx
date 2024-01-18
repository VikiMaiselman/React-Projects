import React, { useState } from "react";
import { styled } from "@mui/system";
import { Paper, AppBar, Toolbar, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import TodoList from "./TodoList";

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
    { id: 0, name: "Wash the dishes", isCompleted: false },
    { id: 1, name: "Do Work Daily Routine", isCompleted: false },
    { id: 2, name: "Buy watch", isCompleted: false },
  ]);

  return (
    <StyledContainer elevation={0}>
      <StyledAppbar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <FavoriteBorderIcon sx={{ verticalAlign: "-5px" }} /> Just Another
            React Todo App{" "}
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </StyledAppbar>

      <TodoList todolist={todos} />
    </StyledContainer>
  );
}
