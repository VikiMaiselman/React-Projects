import React from "react";
import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";

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

export default function CreatePaletteNav({
  open,
  setOpen,
  allExistingPalettes,
  handleSave,
}) {
  const [paletteName, setPaletteName] = React.useState("");

  const handlePaletteNameChange = (event) => {
    const { value } = event.target;
    setPaletteName(value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    handleSave(paletteName);
  };

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (_) => {
      return allExistingPalettes.every(
        (existingPalette) =>
          existingPalette.paletteName.toLowerCase() !==
          paletteName.toLowerCase()
      );
    });
  });

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
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
        <Button variant="contained" color="secondary">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Go Back
          </Link>
        </Button>
        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
            name="paletteName"
            value={paletteName}
            onChange={handlePaletteNameChange}
            validators={["required", "isPaletteNameUnique"]}
            errorMessages={[
              "enter palette name",
              "this palette name was already used",
            ]}
          />
          <Button type="submit" variant="contained" color="primary">
            Save palette
          </Button>
        </ValidatorForm>
      </Toolbar>
    </AppBar>
  );
}
