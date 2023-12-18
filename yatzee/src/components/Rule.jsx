import { useEffect, useState } from "react";
// import "../styles/Rule.css";

export default function Rule({
  ruleName,
  rule,
  scoreOnClick,
  updateGameStatus,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [rulesScoreOnClick, setRulesScoreOnClick] = useState(scoreOnClick);

  useEffect(() => {
    if (!isClicked) setRulesScoreOnClick(scoreOnClick);
  });

  const onClick = () => {
    setIsClicked(true);
    updateGameStatus(scoreOnClick, true);
  };

  //   console.log("given, aftersetstate", scoreOnClick, rulesScoreOnClick);

  return (
    <button className="Rule" onClick={onClick} disabled={isClicked}>
      <p>{ruleName}</p>
      {isClicked ? rulesScoreOnClick : rule}
    </button>
  );
}
