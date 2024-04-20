import React from "react";

import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ createProject, close }) {
  const modal = React.useRef();
  const title = React.useRef();
  const descr = React.useRef();
  const date = React.useRef();

  const handleClick = () => {
    const newTitle = title.current.value;
    const newDescription = descr.current.value;
    const newDate = date.current.value;

    if (newTitle.trim() === "" || newDescription.trim() === "" || newDate.trim() === "") {
      modal.current.open();
      return;
    }

    createProject({
      title: newTitle,
      description: newDescription,
      date: newDate,
      id: Math.random(),
    });
  };

  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Oooops... invalid input</h2>
        <p className="text-stone-600 mb-4">Please, make sure you entered a valid input in all the fields.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button onClick={close} className="text-stone-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleClick}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} label="Title" />
          <Input ref={descr} label="Description" textarea />
          <Input type="date" ref={date} label="Due Date" />
        </div>
      </div>
    </>
  );
}
