import React from "react";

export default function TimerChallenge({ title, targetTime }) {
  const [timerExpired, setTimerExpired] = React.useState();
  const [timerStarted, setTimerStarted] = React.useState(false);

  const timer = React.useRef(); // is component instance specific (each components gets its timer
  //   independent from others - this would not be the case if we put timer as a regular var outside the component somewhere in the file)
  // on the other hand, it won't ve reset or cleared when component re-executes
  const handleClick = (e) => {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
    setTimerStarted(true);
  };

  const handleStop = () => {
    clearTimeout(timer.current);
    setTimerStarted(false);
  };

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired ? (
        <p>You lost!</p>
      ) : (
        <>
          <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? "s" : ""}
          </p>
          <p>
            <button onClick={timerStarted ? handleStop : handleClick}>
              {timerStarted ? "Stop" : "Start"} Challenge
            </button>
          </p>
          <p className={timerStarted ? "active" : ""}>{timerStarted ? "Time is running" : "Timer stopped"}</p>
        </>
      )}
    </section>
  );
}
