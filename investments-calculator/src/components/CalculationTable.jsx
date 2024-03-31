import React from "react";

import { calculateInvestmentResults, formatter } from "../util/investment-calculations.js";

export default function CalculationTable({ inputs }) {
  const data = calculateInvestmentResults({
    initialInvestment: inputs["Initial Investment"],
    annualInvestment: inputs["Annual Investment"],
    expectedReturn: inputs["Expected Return"],
    duration: inputs["Duration"],
  });
  const initialInvestment = data[0]?.valueEndOfYear - data[0]?.interest - data[0]?.annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          React.Children.toArray(
            data.map((d) => {
              const totalInterest = d.valueEndOfYear - d.annualInvestment * d.year - initialInvestment;
              const totalInvested = d.valueEndOfYear - totalInterest;
              return (
                <tr>
                  <td>{d.year}</td>
                  <td>{formatter.format(d.valueEndOfYear)}</td>
                  <td>{formatter.format(d.interest)}</td>
                  <td>{formatter.format(totalInterest)}</td>
                  <td>{formatter.format(totalInvested)}</td>
                </tr>
              );
            })
          )}
      </tbody>
    </table>
  );
}
