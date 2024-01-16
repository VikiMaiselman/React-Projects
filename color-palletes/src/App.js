import React from "react";
import { Route, Routes } from "react-router-dom";

import Palette from "./components/Palette";

import seedColors from "./seedColors";
import generateColors from "./colorHelpers";
import "./App.css";

function App() {
  // const newPalette = generateColors(seedColors[3]);
  return (
    <div className="App">
      {/* <Palette palette={newPalette} /> */}
      <Routes>
        {/* <Route path="/" element/> */}
        <Route path="/palette/:paletteId" element={<Palette />} />
      </Routes>
    </div>
  );
}

export default App;
