import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import PalettesList from "./components/PalettesList";
import Palette from "./components/Palette";
import SingleColorPalette from "./components/SingleColorPalette";
import CreatePaletteForm from "./components/CreatePaletteForm";
import useLocalStorageState from "./components/hooks/useLocalStorageState";

import seedColors from "./seedColors";
import "./App.css";

function App() {
  const [palettes, setPalettes] = useLocalStorageState("palettes", seedColors);

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PalettesList palettes={palettes} />} />
        <Route
          path="/palette/:paletteId"
          element={<Palette seedColors={palettes} />}
        />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPalette seedColors={palettes} />}
        />
        <Route
          path="/palette/new"
          element={
            <CreatePaletteForm
              savePalette={savePalette}
              allExistingPalettes={palettes}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
