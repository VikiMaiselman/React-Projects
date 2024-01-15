import React from "react";

import Palette from "./components/Palette";

import seedColors from "./seedColors";
import generateColors from "./colorHelpers";
import "./App.css";

function App() {
  const newPalette = generateColors(seedColors[3]);
  return (
    <div className="App">
      <Palette palette={newPalette} />
    </div>
  );
}

export default App;
