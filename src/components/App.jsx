import React, { useEffect, useState } from "react";

import DiceDisplay from "./DiceDisplay";
import Rule from "./Rule";
import { rulesLower, rulesUpper } from "../rules";
import "../styles/App.css";
import "../styles/Rule.css";

function App() {
  const [frequencies, setFrequencies] = useState();
  const [gameStatus, setGameStatus] = useState({
    totalScore: 0,
    resetCounter: false,
  });

  const updateGameStatus = (score, toReset) => {
    const updGameSt = (prevState) => {
      return {
        totalScore: prevState.totalScore + score,
        resetCounter: toReset,
      };
    };
    setGameStatus(updGameSt);
  };

  const checkRuleValidity = (rule, frequencies) => {
    const rule1 =
      frequencies[0] !== 0 &&
      frequencies[1] !== 0 &&
      frequencies[2] !== 0 &&
      frequencies[3] !== 0;
    const rule2 =
      frequencies[1] !== 0 &&
      frequencies[2] !== 0 &&
      frequencies[3] !== 0 &&
      frequencies[4] !== 0;
    const rule3 =
      frequencies[2] !== 0 &&
      frequencies[3] !== 0 &&
      frequencies[4] !== 0 &&
      frequencies[5] !== 0;

    if (rule.ruleName === "Small Straight") {
      if (rule1 || rule2 || rule3) return true;
    }

    if (rule.ruleName === "Large Straight") {
      if (
        frequencies[1] !== 0 &&
        frequencies[2] !== 0 &&
        frequencies[3] !== 0 &&
        frequencies[4] !== 0 &&
        (frequencies[0] !== 0 || frequencies[5] !== 0)
      ) {
        return true;
      }
    }

    if (rule.ruleName === "Full House") {
      if (frequencies.includes(2) && frequencies.includes(3)) {
        console.log("should not you work");
        return true;
      }
    }

    if (rule.ruleName === "Yahtzee") {
      if (frequencies.includes(5)) return true;
    }

    return false;
  };

  return (
    <div className="App">
      <h1 className="App-Header">Yahtzee!</h1>
      <h1 className="Score">Total Score: {gameStatus.totalScore}</h1>
      <DiceDisplay
        toReset={gameStatus.resetCounter}
        updateGameStatus={updateGameStatus}
        setFrequencies={setFrequencies}
      />

      <div className="All-Rules">
        {frequencies &&
          rulesUpper.map((rule, idx) => {
            console.log("frequencies array in upper rules", frequencies);
            const score = (idx + 1) * frequencies[idx];
            return (
              <Rule
                className="Rule"
                key={rule.ruleName}
                ruleName={rule.ruleName}
                rule={rule.rule}
                scoreOnClick={score}
                updateGameStatus={updateGameStatus}
              />
            );
          })}
      </div>

      <div className="All-Rules">
        {frequencies &&
          rulesLower.map((rule, idx) => {
            let score;

            if (idx === 0 || idx === 1 || idx === 2) {
              const neededFrequencyIdx = frequencies.findLastIndex(
                (freq) => freq >= idx + 2
              );
              score = (neededFrequencyIdx + 1) * (idx + 2);
            } else if (idx === rulesLower.length - 1) {
              score = frequencies.reduce(
                (acc, freq, i) => freq * (i + 1) + acc,
                0
              );
            } else {
              const isValid = checkRuleValidity(rule, frequencies);
              score = isValid ? rule.scoreOnClick : 0;
            }

            return (
              <Rule
                className="Rule"
                key={rule.ruleName}
                ruleName={rule.ruleName}
                rule={rule.rule}
                scoreOnClick={score}
                updateGameStatus={updateGameStatus}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
