import React from "react";
import { styled } from "@mui/system";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomListContainer = styled(List)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
const StyledCheckbox = styled(Checkbox)({
  "&.MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      fill: "#50623A", // Set your custom color here
    },
  },
});

// MuiButtonBase-root-MuiCheckbox-root.Mui-checked
export default function TodoList({ todolist }) {
  const todolistTodisplay = React.Children.toArray(
    todolist.map((todo) => (
      <ListItem
        sx={{ width: "50%", borderBottom: "1px solid #50623A" }}
        secondaryAction={
          <IconButton edge="end" aria-label="comments">
            <DeleteIcon />
          </IconButton>
        }
      >
        <StyledCheckbox
          edge="start"
          //   checked={checked.indexOf(value) !== -1}
          tabIndex={-1}
          disableRipple
          //   inputProps={{ "aria-labelledby": labelId }}
        />
        <ListItemText> {todo.name}</ListItemText>
      </ListItem>
    ))
  );
  return <CustomListContainer>{todolistTodisplay}</CustomListContainer>;
}
