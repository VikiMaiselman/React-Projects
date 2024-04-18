import React from "react";

import Input from "./Input";

export default function NewProject({ createProject }) {
  const title = React.useRef();
  const descr = React.useRef();
  const date = React.useRef();

  const handleClick = () => {
    createProject({
      title: title.current.value,
      description: descr.current.value,
      date: date.current.value,
    });
  };

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950">Cancel</button>
        </li>
        <li>
          <button onClick={handleClick} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input ref={title} label="Title" />
        <Input ref={descr} label="Description" textarea />
        <Input ref={date} label="Due Date" />
      </div>
    </div>
  );
}
