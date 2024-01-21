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

export default function CreatePaletteForm() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [colorPicked, setColorPicked] = React.useState({
    hex: "darkblue",
    name: "Darkblue",
  });
  const [colors, setColors] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setColorPicked({ ...colorPicked, [name]: value });
  };
  const handleAddColor = (event) => {
    event.preventDefault();
    setColors([...colors, colorPicked]);
  };

  // validation library allows to define custom validators
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isNameUnique", (value) => {
      return colors.every(
        (color) => color.name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every((color) => color.hex !== colorPicked.hex);
    });
  });

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
            Persistent drawer
          </Typography>
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
            <Button variant="outlined" color="secondary">
              Clear all
            </Button>
            <Button variant="outlined" color="primary">
              Create random
            </Button>
          </div>
          <div>
            <ChromePicker
              color={colorPicked}
              onChangeComplete={(newPickedColor) => {
                setColorPicked({ hex: newPickedColor.hex, name: "" });
              }}
            />
          </div>

          <ValidatorForm onSubmit={handleAddColor}>
            <TextValidator
              name="name"
              value={colorPicked.name}
              onChange={handleChange}
              validators={["required", "isNameUnique", "isColorUnique"]}
              errorMessages={[
                "This field is required",
                "The name should be unique",
                "The color should be unique",
              ]}
            />
            <Button
              variant="outlined"
              sx={{ color: colorPicked, borderColor: colorPicked }}
              type="submit"
            >
              Add Color
            </Button>
          </ValidatorForm>
        </DrawerContent>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {React.Children.toArray(
          colors.map((col) => {
            return <DraggableColorBox color={col} />;
          })
        )}
      </Main>
    </Box>
  );
}
