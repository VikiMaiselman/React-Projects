import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import "../styles/Navbar.css";

export default function Navbar({
  defaultShadeLevel,
  shadeLevel,
  handleLevelChange,
  handleColorFormatChange,
}) {
  const [colorFormat, setColorFormat] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setColorFormat(value);
    handleColorFormatChange(value);
    setIsOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsOpen(false);
  };

  const snackbarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <nav className="Navbar">
      <div className="logo">
        <Link to="/">react-color-palettes</Link>
      </div>
      <div className="slider-container">
        <div className="slider-msg">Level: {shadeLevel}</div>
        <div className="slider">
          <Slider
            defaultValue={defaultShadeLevel}
            min={100}
            max={900}
            step={100}
            onChangeComplete={handleLevelChange}
          />
          {/* Slider allows us to see different colors' shades' arrays */}
        </div>
      </div>

      <div className="Navbar-select">
        <FormControl
          sx={{ m: 1, minWidth: 300, padding: 0, margin: 0 }}
          size="small"
        >
          <InputLabel id="select-color-format">Color format:</InputLabel>
          <Select
            labelId="select-color-format"
            id="color-format"
            name="color-format"
            value={colorFormat}
            label="Color Format"
            onChange={handleSelectChange}
          >
            <MenuItem value={"hex"}>HEX - #ffffff</MenuItem>
            <MenuItem value={"rgb"}>RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value={"rgba"}>RGBA - rgb(255,255,255,1.0)</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <Snackbar
          open={isOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message="Format changed!"
          action={snackbarAction}
        />
      </div>
    </nav>
  );
}
