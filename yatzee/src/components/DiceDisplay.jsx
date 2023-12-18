import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import "../styles/DiceDisplay.css";

const rollCounterStartNumber = 3;
const dicesNumbers = ["one", "two", "three", "four", "five", "six"];
let frequencyMap = new Map([
  ["one", 0],
  ["two", 0],
  ["three", 0],
  ["four", 0],
  ["five", 0],
  ["six", 0],
]);

export default function DiceDisplay({
  toReset,
  updateGameStatus,
  setFrequencies,
}) {
  const [dices, setDices] = useState([
    { diceN: getNewDice(), toRoll: true },
    { diceN: getNewDice(), toRoll: true },
    { diceN: getNewDice(), toRoll: true },
    { diceN: getNewDice(), toRoll: true },
    { diceN: getNewDice(), toRoll: true },
  ]);
  const [rollStatus, setRollStatus] = useState({
    rollCounter: rollCounterStartNumber,
    areRolling: false,
  });

  const clearMap = () => {
    frequencyMap.clear();
    frequencyMap = new Map([
      ["one", 0],
      ["two", 0],
      ["three", 0],
      ["four", 0],
      ["five", 0],
      ["six", 0],
    ]);
  };

  useEffect(() => {
    console.log(dices);
    dices.forEach((die) => {
      console.log(die.diceN, frequencyMap.get(die.diceN));
      frequencyMap.set(die.diceN, frequencyMap.get(die.diceN) + 1);
    });
    setFrequencies([...frequencyMap.values()]);
    clearMap();
  }, [dices]);

  useEffect(() => {
    setDices([
      { diceN: getNewDice(), toRoll: true },
      { diceN: getNewDice(), toRoll: true },
      { diceN: getNewDice(), toRoll: true },
      { diceN: getNewDice(), toRoll: true },
      { diceN: getNewDice(), toRoll: true },
    ]);
    updateCounter(rollCounterStartNumber);
    updateGameStatus(0, false);
  }, [toReset]);

  function getNewDice() {
    return dicesNumbers[Math.floor(Math.random() * dicesNumbers.length)];
  }

  const toggleFreezeDice = (diceToFreezeIdx, shouldRoll) => {
    const newDiceSet = dices.map((dice, idx) => {
      if (diceToFreezeIdx === idx) {
        dice.toRoll = shouldRoll;
      }
      return dice;
    });
    setDices(newDiceSet);
  };

  const roll = () => {
    const rollsLeft = rollStatus.rollCounter - 1;
    updateCounter(rollsLeft, true);

    const newDiceSet = dices.map((dice, idx) => {
      if (dice.toRoll === false) return dice;

      const newDie = getNewDice();
      frequencyMap.set(
        newDie,
        frequencyMap.get(newDie) === 0 ? 1 : frequencyMap.get(newDie) + 1
      );
      return {
        diceN: newDie,
        toRoll: true,
      };
    });

    setDices(newDiceSet);
    setFrequencies([...frequencyMap.values()]);
    clearMap();

    setTimeout(() => {
      updateCounter(rollsLeft, false);
    }, 500);
  };

  const updateCounter = (toNum, isRoll) => {
    setRollStatus({
      rollCounter: toNum,
      areRolling: isRoll,
    });
  };

  return (
    <div className="DiceRoll-main">
      <div className="DiceRoll">
        {dices.map((dice, idx) => (
          <Dice
            diceNum={dices[idx].diceN}
            diceIdx={idx}
            key={idx}
            toggleFreezeDice={toggleFreezeDice}
            toRoll={dices[idx].toRoll}
            areRolling={rollStatus.areRolling}
          />
        ))}
      </div>
      <button
        className="DiceRoll-btn"
        onClick={roll}
        disabled={rollStatus.rollCounter === 0}
      >
        {rollStatus.rollCounter} Rolls left!
      </button>
    </div>
  );
}
