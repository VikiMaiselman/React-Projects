import React, { useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import ColorBox from "./ColorBox";

import "../styles/Palette.css";

export default function Palette({ palette }) {
  const { colors, emoji, id, paletteName } = palette;
  const defaultShadeValue = 500;

  const [shadeLevel, setShadeLevel] = useState(defaultShadeValue);

  const colorBoxes = React.Children.toArray(
    colors[shadeLevel].map((color) => {
      return <ColorBox color={color} />;
    })
  );

  const handleChange = (newShadeLevel) => {
    setShadeLevel(newShadeLevel);
  };

  return (
    <div className="Palette">
      {/* Navbar to be implemented */}
      <div className="slider">
        <Slider
          defaultValue={defaultShadeValue}
          min={100}
          max={900}
          step={100}
          onChangeComplete={handleChange}
        />
        {/* Slider allows us to see different colors shades arrays */}
      </div>

      {/* a list of colorBoxes */}
      <div className="Palette-colors">{colorBoxes}</div>
      {/* Footer to be implemented */}
    </div>
  );
}
