import React from "react";
import { todosReducer } from "../reducers/Todos.reducer";
import useLocalStorageReducer from "../hooks/useLocalStorageReducer";

const initialTodos = [
  { id: 0, task: "Wash the dishes", isCompleted: false },
  { id: 1, task: "Do Work Daily Routine", isCompleted: false },
  { id: 2, task: "Buy watch", isCompleted: false },
];

// issue with the approach of 1 context is that because everyone has access to the same context,
// everyone will be rerendered on todos-array change
// even if this specific component does not depend on todos
export const TodosContext = React.createContext();

// add another context to separate dispatch and todos
export const DispatchContext = React.createContext();

export default function TodosContextProvider({ children }) {
  // ∆ usage of useState() (custom) to useReducer()
  //   const { todos, addTask, deleteTask, updateTask } =
  //     useTodosState(initialTodos);
  //   const [todos, dispatch] = React.useReducer(todosReducer, initialTodos);

  // if you want to get back to local storage -- define your custom useReducer
  const [todos, dispatch] = useLocalStorageReducer(
    "todos",
    initialTodos,
    todosReducer
  );

  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
}
