import React from "react";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1%",
  backgroundColor: "white",
  border: "1px solid black",
  borderRadius: "10px",
  position: "relative",
  "&:hover": {
    cursor: "pointer",
  },
});

const ColorsContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  width: "95%",
  backgroundColor: "lightgrey",
  marginBottom: "10px",
  borderRadius: "5px",
  overflow: "hidden", // this allows individual color boxes not to overflow the parent box and we will indeed see the border radius
});

const TitleContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  gap: "5px",
});

const MiniPaletteTitle = styled("h4")({
  fontSize: "0.75rem",
  textDecoration: "none",
});

const MiniPaletteEmoji = styled("span")({});

export default function MiniPalette({ palette, deletePalette }) {
  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    deletePalette(palette.id);
  };

  const colors = React.Children.toArray(
    palette.colors.map((col) => {
      const color = col.color;
      return (
        <div
          style={{ backgroundColor: color, width: "20%", height: "30px" }}
        ></div>
      );
    })
  );

  return (
    <StyledContainer>
      <Button
        onClick={handleDelete}
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
          minWidth: "15px",
          padding: "5px",
          opacity: "0",
          transition: "all 0.3s ease-in-out",
          color: "darkblue",
          "&:hover": {
            opacity: "1",
          },
        }}
      >
        <DeleteIcon onClick={handleDelete} />
      </Button>
      <TitleContainer>
        <MiniPaletteEmoji> {palette.emoji}</MiniPaletteEmoji>
        <MiniPaletteTitle>{palette.paletteName}</MiniPaletteTitle>
        <MiniPaletteEmoji> {palette.emoji}</MiniPaletteEmoji>
      </TitleContainer>
      <ColorsContainer>{colors}</ColorsContainer>
    </StyledContainer>
  );
}
