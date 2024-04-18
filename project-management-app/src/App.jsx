import React from "react";

import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import StartPage from "./components/StartPage";

function App() {
  const [projectsState, setProjectsState] = React.useState({
    currentProject: undefined,
    projects: [],
  });

  const startCreateProject = () => {
    setProjectsState((prevSt) => ({ ...prevSt, currentProject: null }));
  };

  const createProject = (project) => {
    setProjectsState((prevSt) => {
      return { ...prevSt, projects: [...prevSt.projects, project] };
    });
  };

  let content = <StartPage startCreateProject={startCreateProject} />;
  if (projectsState.currentProject === null) content = <NewProject createProject={createProject} />;

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar startCreateProject={startCreateProject} />
      {content}
    </main>
  );
}

export default App;
