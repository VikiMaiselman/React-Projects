import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import generateColors from "../colorHelpers";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "../styles/Palette.css";

export default function Palette({ seedColors }) {
  const defaultShadeLevel = 500;
  const [shadeLevel, setShadeLevel] = useState(defaultShadeLevel);
  const [colorFormat, setColorFormat] = useState("hex");
  const [palette, setPalette] = useState();

  const { paletteId } = useParams();

  useEffect(() => {
    const seedIndex = seedColors.findIndex(
      (palette) => palette.id === paletteId
    );
    const generatedPalette = generateColors(seedColors[seedIndex]);
    setPalette(generatedPalette);
  }, []);

  const colorBoxes =
    palette &&
    React.Children.toArray(
      palette.colors[shadeLevel].map((color) => {
        return (
          <ColorBox
            color={color}
            colorFormat={colorFormat}
            colorId={color.id}
            paletteId={paletteId}
          />
        );
      })
    );

  const handleLevelChange = (newShadeLevel) => {
    setShadeLevel(newShadeLevel);
  };

  const handleColorFormatChange = (newColorFormat) => {
    setColorFormat(newColorFormat);
  };

  return (
    palette && (
      <div className="Palette">
        <Navbar
          defaultShadeLevel={defaultShadeLevel}
          shadeLevel={shadeLevel}
          handleLevelChange={handleLevelChange}
          handleColorFormatChange={handleColorFormatChange}
        />

        {/* a list of colorBoxes */}
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter palette={palette} />
      </div>
    )
  );
}
