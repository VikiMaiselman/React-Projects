export default function Dice({
  diceNum,
  diceIdx,
  toggleFreezeDice,
  toRoll,
  areRolling,
}) {
  const handleClick = () => {
    toggleFreezeDice(diceIdx, !toRoll);
  };
  return (
    <div className="Dice">
      <button
        onClick={handleClick}
        style={toRoll ? { opacity: 1 } : { opacity: 0.5 }}
      >
        {" "}
        <i
          className={`fa-solid fa-dice-${diceNum} fa-8x ${
            areRolling && toRoll ? "fa-bounce" : ""
          }`}
        ></i>
      </button>
    </div>
  );
}
