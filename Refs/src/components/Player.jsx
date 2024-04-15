import React from "react";

export default function Player() {
  const [playerName, setPlayerName] = React.useState("");
  // const [isSubmitted, setIsSubmitted] = React.useState(false);

  // const handleChange = (e) => {
  //   setIsSubmitted(false);
  //   setPlayer(e.target.value);
  // };

  // const handleClick = (e) => {
  //   setIsSubmitted((prevState) => !prevState);
  // };

  const player = React.useRef();

  const handleClick = (e) => {
    setPlayerName(player.current.value);
    player.current.value = "";
  };

  return (
    <section id="player">
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={player} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
