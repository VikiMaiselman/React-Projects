import React from "react";

export default function CalculationTable({ data }) {
  return (
    <table id="result">
      <thead>
        <th>Year</th>
        <th>Investment value</th>
        <th>Interest(Year)</th>
        <th>Total Interest</th>
        <th>Invested Capital</th>
      </thead>
      <tbody>
        {data &&
          React.Children.toArray(
            data.map((d) => {
              return (
                <>
                  <td>{d.year}</td>
                  <td>{d.interest}</td>
                  <td>{d.year}</td>
                </>
              );
            })
          )}
      </tbody>
    </table>
  );
}
