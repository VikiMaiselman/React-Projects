import { useState } from "react";
import Header from "./components/Header";
import Inputs from "./components/Inputs";
import CalculationTable from "./components/CalculationTable";
import "./App.css";

import { calculateInvestmentResults } from "./util/investment-calculations.js";
const initialInputs = {
  "Initial Investment": 0,
  "Annual Investment": 0,
  "Expected Return": 0,
  Duration: 0,
};

function App() {
  const [inputs, setInputs] = useState({
    "Initial Investment": 0,
    "Annual Investment": 0,
    "Expected Return": 0,
    Duration: 0,
  });

  const updateInput = (name, value) => {
    setInputs((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <Header />
      <Inputs updateInput={updateInput} />
      <CalculationTable inputs={inputs} />
    </>
  );
}

export default App;
