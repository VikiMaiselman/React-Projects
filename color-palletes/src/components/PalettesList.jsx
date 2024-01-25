import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import MiniPalette from "./MiniPalette";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import CreateIcon from "@mui/icons-material/Create";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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

const StyledTransitionGroup = styled(TransitionGroup)(({ theme }) => {
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
    "& .palette-enter": {
      opacity: "0",
    },
    "& .palette-enter-active": {
      opacity: "1",
      transition: "all 500ms ease-in-out",
    },
    "& .palette-exit": {
      opacity: "1",
    },
    "& .palette-exit-active": {
      opacity: "0",
      transition: "opacity 0.5s ease-in-out",
    },
  };
});

export default function PalettesList({ palettes, deletePalette }) {
  const palettesToDisplay = React.Children.toArray(
    palettes.map((pal) => (
      <CSSTransition timeout={500} key={pal.id} classNames="palette">
        <Link to={`/palette/${pal.id}`} style={{ textDecoration: "none" }}>
          <MiniPalette palette={pal} deletePalette={deletePalette} />
        </Link>
      </CSSTransition>
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

      <StyledTransitionGroup>{palettesToDisplay}</StyledTransitionGroup>
    </PalettesListContainer>
  );
}
