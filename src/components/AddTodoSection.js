// AddTodoSection.js
import React from 'react';

const AddTodoSection = ({
  newTodo,
  setNewTodo,
  isAddingTodo,
  handleCreateTodo,
  handleEnterKeyPress,
}) => (
  <div className="flex items-center mt-4 justify-between bg-white p-4 rounded shadow mb-4">
    <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      placeholder={isAddingTodo ? 'Adding ...' : 'Add your to-do ...'}
      onKeyDown={handleEnterKeyPress}
      disabled={isAddingTodo}
      className="border-0 p-2 mr-2 w-full"
    />
    <button
      onClick={handleCreateTodo}
      disabled={isAddingTodo}
      className="bg-gray-600 text-white py-2 px-4 rounded-xl"
    >
      Add
    </button>
  </div>
);

export default AddTodoSection;
