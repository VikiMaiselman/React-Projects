import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import seedColors from "../seedColors";
import generateColors from "../colorHelpers";

import "../styles/ColorBox.css";

export default function SingleColorPalette() {
  const [colorPalette, setColorPalette] = useState({
    id: "",
    paletteName: "",
    emoji: "",
    paletteColors: [],
  });
  const [colorFormat, setColorFormat] = useState("hex");
  const { paletteId, colorId } = useParams();

  let generatedPalette;

  useEffect(() => {
    const seedIndex = seedColors.findIndex(
      (palette) => palette.id === paletteId
    );
    generatedPalette = generateColors(seedColors[seedIndex]);

    colorPalette.id = generatedPalette.id;
    colorPalette.paletteName = generatedPalette.paletteName;
    colorPalette.emoji = generatedPalette.emoji;

    const allColors = Object.values(generatedPalette.colors).flat();
    const neededColors = allColors.filter((color) => color.id === colorId);

    setColorPalette({
      ...colorPalette,
      paletteColors: neededColors.slice(1),
    });
  }, []);

  const colorBoxes = React.Children.toArray(
    colorPalette.paletteColors.map((color) => (
      <ColorBox color={color} colorFormat={colorFormat} showLink={false} />
    ))
  );

  return (
    <div className="Palette SingleColorPalette">
      <Navbar handleColorFormatChange={setColorFormat} />
      <div className="Palette-colors">
        {colorBoxes}
        <div
          className="ColorBox"
          style={{
            backgroundColor: "white",
            height: "48%",
            borderBottom: "1px solid black",
          }}
        >
          <div className="copy-container">
            <Link to={`/palette/${paletteId}`}>
              <button
                className="copy-btn"
                style={{
                  opacity: "1",
                  textDecoration: "none",
                  minWidth: "max-content",
                }}
              >
                Go back
              </button>
            </Link>
          </div>
        </div>
      </div>

      <PaletteFooter palette={colorPalette} />
    </div>
  );
}
