import React from "react";
import useTodosState from "../hooks/useTodosState";

const initialTodos = [
  { id: 0, task: "Wash the dishes", isCompleted: false },
  { id: 1, task: "Do Work Daily Routine", isCompleted: false },
  { id: 2, task: "Buy watch", isCompleted: false },
];

export const TodosContext = React.createContext();

export default function TodosContextProvider({ children }) {
  const { todos, addTask, deleteTask, updateTask } =
    useTodosState(initialTodos);
  return (
    <TodosContext.Provider value={{ todos, addTask, deleteTask, updateTask }}>
      {children}
    </TodosContext.Provider>
  );
}
