import React from "react";
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
  width: "90%",
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#50623A",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#50623A",
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "#50623A",
  },
});

const StyledButton = styled(Button)({
  color: "#50623A",
  border: "1px solid #50623A",
});

export default function EditForm({ task, updateTask, toggleEditing }) {
  const [updatedTask, handleTodoTaskChange] = useInputState(task.task);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    task.task = updatedTask;
    updateTask(task);
    toggleEditing(false);
  };

  return (
    <StyledContainer elevation={0}>
      <StyledTextField
        id="task"
        name="task"
        value={updatedTask}
        label="Edit task..."
        placeholder="Edit task..."
        autoComplete="off"
        autoFocus
        onChange={handleTodoTaskChange}
      />
      <StyledButton size="large" onClick={handleFormSubmit}>
        <PlaylistAddCheckIcon style={{ color: "#294B29" }} />
      </StyledButton>
    </StyledContainer>
  );
}
