import React from "react";
import { styled } from "@mui/system";
import chroma from "chroma-js";

const DraggableBox = styled("div")({
  height: "25%",
  width: "20%",
  margin: "1px auto",
  display: "inline-block",
});

export default function DraggableColorBox({ color }) {
  const isLightColor = chroma(color.hex).luminance() <= 0.5;
  return (
    <DraggableBox
      sx={{
        backgroundColor: color.hex,
        color: `${isLightColor ? "white" : "black"}`,
      }}
    >
      {color.name}
    </DraggableBox>
  );
}
