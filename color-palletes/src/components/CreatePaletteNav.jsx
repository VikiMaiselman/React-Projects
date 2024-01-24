import React from "react";
import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

import CreateFormDialog from "./CreateFormDialog";

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "darkblue",
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const NavBtns = styled("div")({
  display: "flex",
});

export default function CreatePaletteNav({
  open,
  setOpen,
  allExistingPalettes,
  handleSave,
}) {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar position="fixed" open={open}>
      <StyledToolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Create your palette
        </Typography>

        <NavBtns>
          <Button
            variant="contained"
            color="secondary"
            sx={{ height: "50%", alignSelf: "center" }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Go Back
            </Link>
          </Button>

          <CreateFormDialog
            handleSave={handleSave}
            allExistingPalettes={allExistingPalettes}
          />
        </NavBtns>
      </StyledToolbar>
    </AppBar>
  );
}
