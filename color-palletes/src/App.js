import React from "react";
import { Route, Routes } from "react-router-dom";

import PalettesList from "./components/PalettesList";
import Palette from "./components/Palette";

import seedColors from "./seedColors";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PalettesList palettes={seedColors} />} />
        <Route path="/palette/:paletteId" element={<Palette />} />
      </Routes>
    </div>
  );
}

export default App;
