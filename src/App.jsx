import { useState, useEffect } from "react";
import { TodoProvider } from "./context";
import TodoItem from "./component/todoItem"; // Corrected import statement
import TodoForm from "./component/todoform"; // Corrected import statement

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? updatedTodo : item)));
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="flex flex-row mx-auto items-center justify-center ">
    <TodoProvider value={{ todos, addTodo, updateTodo, removeTodo, toggleTodo }}>
      <div
        className="flex flex-row mx-auto items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-4"
      >
        {/* Centering container */}
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl px-8 py-10">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Todo Manager</h1>
          <div className="mb-8 mx-14">
            <TodoForm />
          </div>
          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="p-[1px] bg-red-380 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider></div>
  );
}

export default App;
