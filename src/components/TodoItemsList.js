// TodoItemsList.js
import React from 'react';

const TodoItemsList = ({
  filteredTodos,
  handleDeleteTodo,
  handleToggleTodo,
}) => (
  <ul className="flex flex-col space-y-4">
    {filteredTodos.map((todo) => (
      <li
        key={todo._id}
        className="flex items-center justify-between bg-white p-2 rounded-3xl shadow"
      >
        <div>
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={() => handleToggleTodo(todo._id)}
            className="accent-gray-600 mr-2"
          />
          <span className={todo.isDone ? 'line-through text-gray-500' : ''}>
            {todo.text}
          </span>{' '}
        </div>

        <button
          className="bg-gray-600 text-white py-2 px-4 rounded-3xl"
          onClick={() => handleDeleteTodo(todo._id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default TodoItemsList;
