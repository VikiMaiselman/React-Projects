import { useState } from "react";

export default function useTodosState(initialVal) {
  const [todos, setTodos] = useState(initialVal);

  const addTask = (task) => {
    setTodos(() => [
      ...todos,
      { id: todos.length, task: task, isCompleted: false },
    ]);
  };

  const deleteTask = (itemId) => {
    const item = todos.findIndex((todoItem) => todoItem.id === itemId);
    todos.splice(item, 1);
    setTodos(() => [...todos]);
  };

  const updateTask = (task) => {
    const taskIdx = todos.findIndex((todoItem) => todoItem.id === task.id);
    todos.splice(taskIdx, 1, task);
    setTodos(() => [...todos]);
  };

  return {
    todos,
    addTask,
    deleteTask,
    updateTask,
  };
}
