import React from "react";

import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import StartPage from "./components/StartPage";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = React.useState({
    currentProject: undefined,
    projects: [],
    tasks: [],
  });

  const createTask = (task) => {
    const newTask = {
      task: task,
      taskId: Math.random(),
      projectId: projectsState.currentProject,
    };
    setProjectsState((prevSt) => {
      return { ...prevSt, tasks: [...prevSt.tasks, newTask] };
    });
  };

  const deleteTask = (taskId) => {
    setProjectsState((prevSt) => {
      return { ...prevSt, tasks: prevSt.tasks.filter((t) => t.taskId !== taskId) };
    });
  };

  const startCreateProject = () => {
    setProjectsState((prevSt) => ({ ...prevSt, currentProject: null }));
  };

  const createProject = (project) => {
    setProjectsState((prevSt) => {
      return { ...prevSt, currentProject: undefined, projects: [...prevSt.projects, project] };
    });
  };

  const closeWithoutSave = () => {
    setProjectsState((prevSt) => {
      return { ...prevSt, currentProject: undefined };
    });
  };

  const selectProject = (projId) => {
    setProjectsState((prevSt) => {
      return { ...prevSt, currentProject: projId };
    });
  };

  const deleteProject = () => {
    setProjectsState((prevSt) => {
      return {
        ...prevSt,
        currentProject: undefined,
        projects: prevSt.projects.filter((p) => p.id !== prevSt.currentProject),
      };
    });
  };

  let content = <StartPage startCreateProject={startCreateProject} />;
  if (projectsState.currentProject === null)
    content = <NewProject createProject={createProject} close={closeWithoutSave} />;
  if (projectsState.currentProject) {
    const projectSelected = projectsState.projects.find((p) => p.id === projectsState.currentProject);
    const projectTasks = projectsState.tasks.filter((t) => t.projectId === projectsState.currentProject);
    content = (
      <SelectedProject
        project={projectSelected}
        deleteProject={deleteProject}
        createTask={createTask}
        deleteTask={deleteTask}
        tasks={projectTasks}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        startCreateProject={startCreateProject}
        selectProject={selectProject}
        myProjects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
