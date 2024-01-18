import React, { useState } from "react";
import { styled } from "@mui/system";
import { TextField, Paper, Button } from "@mui/material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import useInputState from "../hooks/useInputState";

const StyledContainer = styled(Paper)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "1.5%",
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%",
  backgroundColor: "#EEE6CE",
});

const StyledTextField = styled(TextField)({
  //   marginTop: "1.5%",
  width: "90%",
  //   "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
  //     borderColor: "#50623A",
  //   },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#50623A",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#50623A",
  },
  //   "& .MuiOutlinedInput-input": {
  //     color: "green",
  //   },
  //   "&:hover .MuiOutlinedInput-input": {
  //     color: "red",
  //   },
  //   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
  //     color: "#50623A",
  //   },
  //   "& .MuiInputLabel-outlined": {
  //     color: "green",
  //   },
  //   "&:hover .MuiInputLabel-outlined": {
  //     color: "red",
  //   },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "#50623A",
  },
});

const StyledButton = styled(Button)({
  color: "#50623A",
  border: "1px solid #50623A",
});

export default function TodoForm({ addTask }) {
  const [todoTask, handleTodoTaskChange, reset] = useInputState();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addTask(todoTask);
    reset();
  };

  return (
    <StyledContainer
      elevation={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") handleFormSubmit(event);
      }}
    >
      <StyledTextField
        id="task"
        name="task"
        value={todoTask}
        label="Create new task..."
        placeholder="Create new task..."
        autoComplete="off"
        onChange={handleTodoTaskChange}
      />
      <StyledButton size="large" onClick={handleFormSubmit}>
        <PlaylistAddCheckIcon style={{ color: "#294B29" }} />
      </StyledButton>
    </StyledContainer>
  );
}
