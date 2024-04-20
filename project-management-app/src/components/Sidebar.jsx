import React from "react";

export default function Sidebar({ startCreateProject, selectProject, myProjects }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
        <button
          onClick={startCreateProject}
          className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:text-stone-100"
        >
          + Add New Project
        </button>
      </div>
      <ul className="mt-8">
        {React.Children.toArray(
          myProjects.map((p) => (
            <li>
              <button
                onClick={() => selectProject(p.id)}
                className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800"
              >
                {p.title}
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}
