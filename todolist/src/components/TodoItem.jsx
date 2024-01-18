import React, { useState } from "react";
import { styled } from "@mui/system";
import { Checkbox, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import useToggle from "../hooks/useToggle";
import EditForm from "./EditForm";

const StyledCheckbox = styled(Checkbox)({
  "&.MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      fill: "#50623A",
    },
  },
});

export default function TodoItem({ todoTask, deleteTask, updateTask }) {
  const [isEditing, toggleEditing] = useToggle(false);
  const handleSelectChange = () => {
    todoTask.isCompleted = !todoTask.isCompleted;
    updateTask(todoTask);
  };

  return isEditing ? (
    <EditForm task={todoTask} updateTask={updateTask} toggleEditing={toggleEditing}/>
  ) : (
    <>
      <ListItem
        sx={{ width: "50%", borderBottom: "1px solid #50623A" }}
        secondaryAction={
          <>
            <IconButton edge="end" aria-label="edit" onClick={toggleEditing}>
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteTask(todoTask.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <StyledCheckbox
          edge="start"
          checked={todoTask.isCompleted}
          tabIndex={-1}
          disableRipple
          onChange={handleSelectChange}
        />
        <ListItemText
          style={{
            textDecoration: todoTask.isCompleted ? "line-through" : "none",
          }} // strike through task based on whetehr checked or not
        >
          {" "}
          {todoTask.task}
        </ListItemText>
      </ListItem>
    </>
  );
}
