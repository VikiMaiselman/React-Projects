import React, { forwardRef } from "react";
import { styled } from "@mui/system";
import chroma from "chroma-js";
import DeleteIcon from "@mui/icons-material/Delete";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const DraggableBox = styled("div")({
  height: "100%",
  width: "100%",
  margin: "1px auto",
  display: "inline-block",
  cursor: "move",
});

const DraggableColorBox = forwardRef(({ color, deleteColor }, ref) => {
  const isLightColor = chroma(color.color).luminance() <= 0.5;

  const DraggableBoxContent = styled("div")({
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "5px",
    "&:hover svg": {
      color: `${isLightColor ? "white" : "black"}`,
      transform: "scale(1.3)",
      transition: "all 0.2s ease-in-out",
    },
  });

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    deleteColor(color);
  };

  return (
    <DraggableBox
      onClick={handleDelete}
      sx={{
        backgroundColor: color.color,
        color: `${
          isLightColor ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)"
        }`,
      }}
      ref={ref}
    >
      <DraggableBoxContent>
        <span>{color.name}</span>
        <DeleteIcon onMouseDown={handleDelete} />
      </DraggableBoxContent>
    </DraggableBox>
  );
});

export default DraggableColorBox;
