// TodoItemsList.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const TodoItemsList = ({
  filteredTodos,
  handleDeleteTodo,
  handleToggleTodo,
}) => {
  const [showDetails, setShowDetails] = useState(null);

  const handleToggleDetails = (todoId) => {
    setShowDetails(showDetails === todoId ? null : todoId);
  };

  return (
    <ul className="flex flex-col space-y-4">
      {filteredTodos.map((todo) => (
        <li
          key={todo._id}
          className="relative flex items-center justify-between bg-white p-2 rounded-3xl shadow"
        >
          <div>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => handleToggleTodo(todo._id)}
              className="accent-gray-600 m-2"
            />
            <span className={todo.isDone ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>{' '}
          </div>

          <button
            className="text-gray-600 text-xl mx-2 focus:outline-none"
            onClick={() => handleToggleDetails(todo._id)}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>

          {showDetails === todo._id && (
            <div className="bg-white px-4 py-2 rounded-3xl shadow z-[1000] absolute -bottom-4 right-0 transform -translate-x-1/2 translate-y-4">
              {/* Your details content goes here */}
              <button
                className="text-red-500 rounded-3xl"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoItemsList;
