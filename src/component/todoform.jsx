import { useState } from 'react';
import { useTodo } from '../context';
import './App.css'; // Assuming this file contains global styles

function TodoForm() {
  const [todoText, setTodoText] = useState('');
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todoText.trim()) return; // Prevent adding empty todos

    addTodo({
      todo: todoText,
      completed: false,
    });
    setTodoText('');
  };

  return (
    <form onSubmit={add} className="flex items-center gap-3">
      <input
        type="text"
        placeholder="New Task"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        ➕ Add
      </button>
    </form>
  );
}

export default TodoForm;
