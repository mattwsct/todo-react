// AddTodoSection.js
import React from 'react';

const AddTodoSection = ({
  newTodo,
  setNewTodo,
  isAddingTodo,
  handleCreateTodo,
  handleEnterKeyPress,
}) => (
  <div className="flex items-center mt-4 justify-between bg-white p-2 rounded-3xl mb-4">
    <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      placeholder={isAddingTodo ? 'Adding ...' : 'Add your to-do ...'}
      onKeyDown={handleEnterKeyPress}
      disabled={isAddingTodo}
      className="border-none p-2 mr-2 w-full"
    />
    <button
      onClick={handleCreateTodo}
      disabled={isAddingTodo}
      className="bg-[#526f92] text-white py-2 px-4 rounded-3xl"
    >
      Add
    </button>
  </div>
);

export default AddTodoSection;
