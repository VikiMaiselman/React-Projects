import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import MiniPalette from "./MiniPalette";

const PalettesListContainer = styled("div")({
  backgroundColor: "darkblue",
  height: "100%",
  overflow: "scroll",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "5%",
  width: "100%",
});

const PalettesListNav = styled("nav")({
  width: "50%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  margin: "25px auto",
  "& h1": {
    fontSize: "2rem",
  },
  "& a": {
    textDecoration: "none",
    color: "white",
  },
});

const PalettesContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 30%)",
  gap: "2.5%",
  width: "70%",
  height: "100%",
  marginBottom: "65px",
});

export default function PalettesList({ palettes, deletePalette }) {
  const palettesToDisplay = React.Children.toArray(
    palettes.map((pal) => (
      <Link to={`/palette/${pal.id}`} style={{ textDecoration: "none" }}>
        <MiniPalette palette={pal} deletePalette={deletePalette}/>
      </Link>
    ))
  );
  return (
    <PalettesListContainer>
      <PalettesListNav>
        <h1>React Color Picker</h1>
        <Link to="/palette/new">create palette</Link>
      </PalettesListNav>

      <PalettesContainer>{palettesToDisplay}</PalettesContainer>
    </PalettesListContainer>
  );
}
