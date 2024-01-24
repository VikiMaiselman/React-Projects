import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import MiniPalette from "./MiniPalette";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import CreateIcon from "@mui/icons-material/Create";

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
  margin: "25px auto 0 auto",
  "& h1": {
    fontSize: "2rem",
  },
  "& a": {
    textDecoration: "none",
    transition: "all 0.3s ease-in-out",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
  },
  "&:hover a": {
    color: "rgba(255,255,255,1)",
    textTransform: "uppercase",
  },
});

const PalettesContainer = styled("div")(({ theme }) => {
  return {
    display: "grid",
    gridTemplateColumns: "repeat(3, 31.5%)",
    gap: "2.5%",
    width: "70%",
    height: "100%",
    marginBottom: "65px",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 90%)",
    },
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "repeat(2, 50%)",
    },
  };
});

export default function PalettesList({ palettes, deletePalette }) {
  const palettesToDisplay = React.Children.toArray(
    palettes.map((pal) => (
      <Link to={`/palette/${pal.id}`} style={{ textDecoration: "none" }}>
        <MiniPalette palette={pal} deletePalette={deletePalette} />
      </Link>
    ))
  );
  return (
    <PalettesListContainer>
      <PalettesListNav>
        <h1>
          <PaletteOutlinedIcon />
          &nbsp; React Color Picker
        </h1>
        <Link to="/palette/new">
          <CreateIcon />
          Create new Palette
        </Link>
      </PalettesListNav>

      <PalettesContainer>{palettesToDisplay}</PalettesContainer>
    </PalettesListContainer>
  );
}
