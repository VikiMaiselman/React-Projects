export function todosReducer(todos, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...todos,
        { id: todos.length, task: action.task, isCompleted: false },
      ];
    case "DELETE":
      const newTodos = todos.filter((todoItem) => todoItem.id !== action.id);
      return newTodos;
    case "UPDATE":
      const taskIdx = todos.findIndex((todoItem) => todoItem.id === action.id);
      todos.splice(taskIdx, 1, action.task);
      return [...todos];
    default:
      return todos;
  }
}
