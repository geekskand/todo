import { useTodo } from "../context";
import { useState } from "react";

function TodoItem({ todo }) {
  const { updateTodo, removeTodo, toggleTodo } = useTodo();
  const [edit, setEdit] = useState(false);
  const [todoTxt, setTodoTxt] = useState(todo.todo);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoTxt });
    setEdit(false);
  };

  const toggleComplete = () => {
    toggleTodo(todo.id);
  };

  const deleteTodo = () => {
    removeTodo(todo.id);
  };

  return (
    <div
      className={`flex border border-gray-300 rounded-lg px-4 py-2 gap-x-3 shadow-sm shadow-gray-400/20 duration-300 text-gray-700 ${
        todo.completed ? "bg-green-100" : "bg-purple-50"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer accent-purple-500"
        checked={todo.completed}
        onChange={toggleComplete}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg focus:ring-2 focus:ring-purple-300 ${
          edit ? "border-gray-300 px-3 py-1.5" : "border-transparent"
        } ${todo.completed ? "line-through text-gray-500" : ""}`}
        value={todoTxt}
        onChange={(e) => setTodoTxt(e.target.value)}
        readOnly={!edit}
      />
      {/* Edit/Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-white hover:bg-purple-100 transition duration-150 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          if (todo.completed) return;
          if (edit) {
            editTodo();
          } else {
            setEdit((prev) => !prev);
          }
        }}
        disabled={todo.completed}
      >
        {edit ? "🖫" : "✎"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-white hover:bg-red-100 transition duration-150 shrink-0"
        onClick={deleteTodo}
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
