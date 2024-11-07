import { useState, useEffect } from 'react';
import { TodoProvider } from './context';
import TodoForm from './TodoForm'; // Import your form component
import TodoItem from './TodoItem'; // Import your item component
import './App.css';

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
    setTodos((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, removeTodo, toggleTodo }}>
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="w-full max-w-3xl mx-auto shadow-lg rounded-xl px-6 py-6 bg-white">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Todo Manager</h1>
          <div className="mb-6">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
