import { useState, useEffect } from "react";
import { TodoProvider } from "./context";
import TodoItem from "./component/todoItem"; // Corrected import statement
import TodoForm from "./component/todoform"; // Corrected import statement

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' case
  });
  

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
    

<div className="min-h-screen flex flex-col">
  {/* Navbar */}
  <nav className="bg-gradient-to-r from-indigo-600 via-teal-500 to-blue-500 p-4 shadow-md">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Todo Manager</h1>
      <div>
        <button className="text-white hover:bg-teal-700 px-3 py-2 rounded">Home</button>
        <button className="text-white hover:bg-teal-700 px-3 py-2 rounded">About</button>
        <button className="text-white hover:bg-teal-700 px-3 py-2 rounded">Contact</button>
      </div>
    </div>
  </nav>

  <div className="flex-grow flex justify-center items-start bg-gray-50 py-10 px-4 md:px-8">
    <TodoProvider value={{ todos, addTodo, updateTodo, removeTodo, toggleTodo }}>
      <div className="w-full max-w-4xl mx-auto bg-gray-100 shadow rounded-lg p-6 md:p-8">
        {/* Description */}
        <p className="text-center text-gray-700 mb-6 text-lg">
          Manage your tasks effectively with a simple and intuitive interface.
        </p>

        {/* Todo Form */}
        <div className="mb-8">
          <TodoForm />
        </div>

        {/* Filter Options */}
        <div className="mb-6 flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded shadow ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
            onClick={() => setFilter('all')}
          >
            Show All
          </button>
          <button
            className={`px-4 py-2 rounded shadow ${filter === 'active' ? 'bg-green-600 text-white' : 'bg-teal-100 text-teal-700 hover:bg-teal-200'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 rounded shadow ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          {(() => {
            const completedTodos = todos.filter(todo => todo.completed).length;
            return (
              <>
                <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(completedTodos / todos.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-600 text-center text-sm">{completedTodos} of {todos.length} tasks completed</p>
              </>
            );
          })()}
        </div>

        {/* Todo List */}
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition-shadow duration-200"
            >
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </TodoProvider>
  </div>

  {/* Footer */}
  <footer className="bg-gray-800 p-4 mt-10">
    <div className="max-w-7xl mx-auto text-center text-white">
      <p>Created with love by Skand</p>
    </div>
  </footer>
</div>


  );
}

export default App;
