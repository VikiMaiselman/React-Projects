import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import DraggableColorBox from "./DraggableColorBox";
import CreatePaletteNav from "./CreatePaletteNav";
import ColorPickerForm from "./ColorPickerForm";

import seedColors from "../seedColors";
import { motion } from "framer-motion";

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
  const initialColors = seedColors.find(
    (palette) => palette.id === "flat-ui-colors-french"
  )?.colors;

  const theme = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const [palette, setPalette] = React.useState({
    paletteName: "",
    id: "",
    emoji: "",
    colors: initialColors,
  });
  const [columnsNum, setColumnsNum] = React.useState(5);

  const handleDrawerClose = () => {
    setOpen(false);
    setColumnsNum(6);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setColumnsNum(5);
  };

  const addColor = (colorPicked) => {
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

  const handleSave = (paletteData) => {
    palette.id = paletteData.paletteName.toLowerCase().replaceAll(" ", "-");
    palette.paletteName = paletteData.paletteName;
    palette.emoji = paletteData.paletteEmoji;
    savePalette(palette);
    navigate("/");
  };

  const handleLayoutChange = (layout) => {
    for (const element of layout) {
      element.globalPositionalNumber = element.x + element.y * columnsNum;
    }
    layout.sort((a, b) => a.globalPositionalNumber - b.globalPositionalNumber);

    // Update the positions of colors in the palette based on the new layout
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

    let randNumber = Math.floor(Math.random() * allExistingColors.length);
    let newRandColor = allExistingColors[randNumber];

    while (
      -1 !==
      palette.colors.findIndex((color) => color.name === newRandColor.name)
    ) {
      // to prevent duplicates
      randNumber = Math.floor(Math.random() * allExistingColors.length);
      newRandColor = allExistingColors[randNumber];
    }
    setPalette((prevPalette) => ({
      ...prevPalette,
      colors: [...prevPalette.colors, allExistingColors[randNumber]],
    }));
  };

  return (
    <Box
      sx={{ display: "flex" }}
      component={motion.div}
      timeout={500}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CssBaseline />
      <CreatePaletteNav
        open={open}
        setOpen={handleDrawerOpen}
        allExistingPalettes={allExistingPalettes}
        handleSave={handleSave}
      />

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

          <ColorPickerForm addColor={addColor} palette={palette} />
        </DrawerContent>
      </Drawer>
      <Main open={open} sx={{ marginTop: "-25px" }}>
        <DrawerHeader />
        <GridLayout
          isDraggable={true}
          width={columnsNum === 5 ? 1050 : 1450}
          cols={columnsNum}
          rowHeight={200}
          onLayoutChange={handleLayoutChange}
        >
          {palette.colors?.map((col, idx) => {
            const xPos = idx % columnsNum;
            const yPos = idx >= columnsNum ? idx / columnsNum : 0;
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
