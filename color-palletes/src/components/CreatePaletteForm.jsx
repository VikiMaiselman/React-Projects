import React from "react";
import { ChromePicker } from "react-color";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorBox from "./DraggableColorBox";
import { Link, useNavigate } from "react-router-dom";

import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const drawerWidth = 400;
const appbarHeight = 64; // empirical number

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: `calc(100vh - ${appbarHeight}px)`, // calculates the height w/o appbar
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DrawerContent = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5%",
});

export default function CreatePaletteForm({
  savePalette,
  allExistingPalettes,
}) {
  const initialColors = allExistingPalettes.find(
    (palette) => palette.id === "flat-ui-colors-french"
  ).colors;
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [colorPicked, setColorPicked] = React.useState({
    color: "#00008b",
    name: "Darkblue",
  });
  const [palette, setPalette] = React.useState({
    paletteName: "",
    id: "",
    emoji: "",
    colors: initialColors,
  });

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePickedColorChange = (event) => {
    const { name, value } = event.target;
    setColorPicked({ ...colorPicked, [name]: value });
  };
  const handlePaletteChange = (event) => {
    const { name, value } = event.target;
    setPalette({ ...palette, [name]: value });
  };

  const handleAddColor = (event) => {
    event.preventDefault();
    setPalette({ ...palette, colors: [...palette.colors, colorPicked] });
  };

  const deleteColor = (colorToDelete) => {
    const colorToDeleteIdx = palette.colors.findIndex(
      (paletteColor) =>
        paletteColor.color === colorToDelete.color &&
        paletteColor.name === colorToDelete.name
    );

    palette.colors.splice(colorToDeleteIdx, 1);
    setPalette({
      ...palette,
      colors: palette.colors,
    });
  };

  const handleSave = () => {
    palette.id = palette.paletteName.toLowerCase().replaceAll(" ", "-");
    savePalette(palette);
    navigate("/");
  };

  // validation library allows to define custom validators
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isNameUnique", (value) => {
      return palette.colors.every(
        (col) => col.name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (_) => {
      return palette.colors.every((col) => col.color !== colorPicked.color);
    });

    ValidatorForm.addValidationRule("isPaletteNameUnique", (_) => {
      return allExistingPalettes.every(
        (existingPalette) =>
          existingPalette.paletteName.toLowerCase() !==
          palette.paletteName.toLowerCase()
      );
    });
  });

  const handleLayoutChange = (layout) => {
    for (const element of layout) {
      element.globalPositionalNumber = element.x + element.y * 5;
    }

    layout.sort((a, b) => a.globalPositionalNumber - b.globalPositionalNumber);

    // Update the positions of colors in the palette based on the layout
    const updatedColors = layout.map((item) => {
      return palette.colors.find((col) => col.name === item.i);
    });

    setPalette((prevPalette) => ({
      ...prevPalette,
      colors: updatedColors,
    }));
  };

  const handleClearAll = () => {
    setPalette((prevPalette) => ({
      ...prevPalette,
      colors: [],
    }));
  };

  const handleAddRandom = () => {
    const allExistingColors = allExistingPalettes
      .filter((palette) => palette.id !== "flat-ui-colors-french")
      .flatMap((palette) => palette.colors);

    const randNumber = Math.floor(Math.random() * allExistingColors.length);
    setPalette((prevPalette) => ({
      ...prevPalette,
      colors: [...prevPalette.colors, allExistingColors[randNumber]],
    }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* navbar at the top */}
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
          <ValidatorForm onSubmit={handleSave}>
            <TextValidator
              name="paletteName"
              value={palette.paletteName}
              onChange={handlePaletteChange}
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

      {/* the drawer itself, on the left */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerContent>
          <Typography variant="h4">Design your palette</Typography>
          <div>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearAll}
            >
              Clear all
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddRandom}
            >
              Create random color
            </Button>
          </div>
          <div>
            <ChromePicker
              color={colorPicked.color}
              onChangeComplete={(newPickedColor) => {
                setColorPicked({ color: newPickedColor.hex, name: "" });
              }}
            />
          </div>

          <ValidatorForm onSubmit={handleAddColor}>
            <TextValidator
              name="name"
              value={colorPicked.name}
              onChange={handlePickedColorChange}
              validators={["required", "isNameUnique", "isColorUnique"]}
              errorMessages={[
                "This field is required",
                "The name should be unique",
                "The color should be unique",
              ]}
            />
            <Button
              variant="outlined"
              sx={{ color: colorPicked.color, borderColor: colorPicked.color }}
              type="submit"
            >
              Add Color
            </Button>
          </ValidatorForm>
        </DrawerContent>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <GridLayout
          isDraggable={true}
          width={1050}
          cols={5}
          rowHeight={200}
          onLayoutChange={handleLayoutChange}
        >
          {palette.colors.map((col, idx) => {
            const xPos = idx % 5;
            const yPos = idx >= 5 ? idx / 5 : 0;
            return (
              <div
                key={col?.name?.toString()}
                id={col?.name?.toString()}
                style={{ width: "100%", height: "100%" }}
                data-grid={{ x: xPos, y: yPos, w: 1, h: 1 }}
              >
                <DraggableColorBox
                  key={col.name}
                  color={col}
                  deleteColor={deleteColor}
                />
              </div>
            );
          })}
        </GridLayout>
      </Main>
    </Box>
  );
}
