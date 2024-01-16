import React, { useState } from "react";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "../styles/Palette.css";

export default function Palette({ palette }) {
  const { colors, emoji, id, paletteName } = palette;

  const defaultShadeLevel = 500;
  const [shadeLevel, setShadeLevel] = useState(defaultShadeLevel);
  const [colorFormat, setColorFormat] = useState("hex");

  const colorBoxes = React.Children.toArray(
    colors[shadeLevel].map((color) => {
      console.log("color", color);
      return <ColorBox color={color} colorFormat={colorFormat} />;
    })
  );

  const handleLevelChange = (newShadeLevel) => {
    setShadeLevel(newShadeLevel);
  };

  const handleColorFormatChange = (newColorFormat) => {
    setColorFormat(newColorFormat);
  };

  return (
    <div className="Palette">
      <Navbar
        defaultShadeLevel={defaultShadeLevel}
        shadeLevel={shadeLevel}
        handleLevelChange={handleLevelChange}
        handleColorFormatChange={handleColorFormatChange}
      />

      {/* a list of colorBoxes */}
      <div className="Palette-colors">{colorBoxes}</div>

      <footer className="Palette-footer">
        <span className="footer-emoji">{emoji}</span>
        {paletteName}
        <span className="footer-emoji">{emoji}</span>
      </footer>
    </div>
  );
}
