// TodoItemsList.js
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

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

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <ul className="flex flex-col space-y-4">
      {filteredTodos.map((todo) => (
        <li
          key={todo._id}
          className="relative flex items-center justify-between rounded-3xl bg-white p-2 shadow"
        >
          <div>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => handleToggleTodo(todo._id)}
              className="m-2 accent-gray-600"
            />
            <span className={todo.isDone ? "text-gray-500 line-through" : ""}>
              {todo.text}
            </span>{" "}
          </div>

          <button
            className="mx-2 text-xl text-gray-600 focus:outline-none"
            onClick={(event) => handleToggleDetails(todo._id, event)}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>

          {showDetails === todo._id && (
            <div
              ref={detailsRef}
              className="absolute -bottom-4 -right-6 z-[1000] -translate-x-1/2 translate-y-4 transform rounded-3xl bg-white px-4 py-2 shadow"
            >
              <button
                className="rounded-3xl text-red-500"
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
