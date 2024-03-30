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
  const [inputs, setInputs] = useState(initialInputs);
  const [data, setData] = useState();

  const updateInput = (name, value) => {
    const updaterFunc = (prevState) => {
      return { ...prevState, [name]: +value };
    };

    setInputs(updaterFunc);

    console.log(inputs);

    const data = calculateInvestmentResults({
      initialInvestment: inputs["Initial Investment"],
      annualInvestment: inputs["Annual Investment"],
      expectedReturn: inputs["Expected Return"],
      duration: inputs["Duration"],
    });

    setData(() => data);
  };

  return (
    <>
      <Header />
      <Inputs updateInput={updateInput} />
      <CalculationTable data={data} />
    </>
  );
}

export default App;
