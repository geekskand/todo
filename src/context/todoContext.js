import { createContext, useContext } from "react";

// Create the context with default values
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "todo txt",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  removeTodo: (id) => {},
  toggleTodo: (id) => {},
});

export const useTodo = () => useContext(TodoContext);

// Exporting the provider
export const TodoProvider = TodoContext.Provider;
export default TodoContext;

