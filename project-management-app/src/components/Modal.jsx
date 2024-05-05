import { createPortal } from "react-dom";
import { forwardRef, useRef, useImperativeHandle } from "react";
import Button from "./Button";

export default forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  
  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/80 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog">
        <Button>Close</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});
