import { forwardRef, useRef, useImperativeHandle } from "react";

export default forwardRef(function ResultModal({ targetTime, remainingTime, handleReset }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const computedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / targetTime / 1000) * 100);

  return (
    <dialog ref={dialog} className="result-modal" onClose={handleReset}>
      {" "}
      {/* will close on ESC press */}
      <h2>You {!remainingTime ? "lost" : "won"}</h2>
      {targetTime && <h2>Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stopped the timer with <strong>{computedRemainingTime} seconds left</strong>.
      </p>
      {/* a btn that submits the form will...close the dialog */}
      <form method="dialog" onSubmit={handleReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});
