import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import PalettesList from "./components/PalettesList";
import Palette from "./components/Palette";
import SingleColorPalette from "./components/SingleColorPalette";
import CreatePaletteForm from "./components/CreatePaletteForm";
import useLocalStorageState from "./components/hooks/useLocalStorageState";

import { AnimatePresence } from "framer-motion";

import seedColors from "./seedColors";
import "./App.css";

function App() {
  const [palettes, setPalettes] = useLocalStorageState("palettes", seedColors);

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = (paletteId) => {
    setPalettes(palettes.filter((palette) => palette.id !== paletteId));
  };

  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PalettesList palettes={palettes} deletePalette={deletePalette} />
            }
          />
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
      </AnimatePresence>
    </div>
  );
}

export default App;
