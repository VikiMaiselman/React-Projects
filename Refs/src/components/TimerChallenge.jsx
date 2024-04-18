import React from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [remainingTime, setRemainingTime] = React.useState(targetTime * 1000);

  const dialog = React.useRef();
  const timer = React.useRef(); // is component-instance specific (each components gets its timer
  //   independent from others - this would not be the case if we put timer as a regular var outside the component somewhere in the file)
  // on the other hand, it won't ve reset or cleared when component re-executes
  const handleStart = (e) => {
    timer.current = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(timer.current);
    dialog.current.open();
  };

  const handleReset = () => {
    setRemainingTime(targetTime * 1000);
  };

  const isTimeLeft = remainingTime > 0 && remainingTime < targetTime * 1000;
  if (remainingTime <= 0) handleStop();

  return (
    <>
      <ResultModal ref={dialog} remainingTime={remainingTime} targetTime={targetTime} handleReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <>
          <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? "s" : ""}
          </p>
          <p>
            <button onClick={isTimeLeft ? handleStop : handleStart}>{isTimeLeft ? "Stop" : "Start"} Challenge</button>
          </p>
          <p className={isTimeLeft ? "active" : ""}>{isTimeLeft ? "Time is running" : "Timer stopped"}</p>
        </>
      </section>
    </>
  );
}
