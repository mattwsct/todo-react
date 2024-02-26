// TodoItemsList.js
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const TodoItemsList = ({
  filteredTodos,
  handleDeleteTodo,
  handleToggleTodo,
}) => {
  const [showDetails, setShowDetails] = useState(null);
  const detailsRef = useRef(null);

  const handleToggleDetails = (todoId, event) => {
    event.stopPropagation(); // Stop the event propagation
    setShowDetails((prev) => (prev === todoId ? null : todoId));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setShowDetails(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
            onClick={(event) => handleToggleDetails(todo._id, event)}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>

          {showDetails === todo._id && (
            <div
              ref={detailsRef}
              className="bg-white px-4 py-2 rounded-3xl shadow z-[1000] absolute -bottom-4 -right-6 transform -translate-x-1/2 translate-y-4"
            >
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
