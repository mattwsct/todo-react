// AddTodoSection.js
import React from "react";

const AddTodoSection = ({
  newTodo,
  setNewTodo,
  isAddingTodo,
  handleCreateTodo,
  handleEnterKeyPress,
}) => (
  <div className="mb-4 mt-4 flex items-center justify-between rounded-3xl bg-white p-2">
    <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      placeholder={isAddingTodo ? "Adding ..." : "Add your to-do ..."}
      onKeyDown={handleEnterKeyPress}
      disabled={isAddingTodo}
      className="mr-2 w-full border-none p-2"
    />
    <button
      onClick={handleCreateTodo}
      disabled={isAddingTodo}
      className="rounded-3xl bg-[#526f92] px-4 py-2 text-white"
    >
      Add
    </button>
  </div>
);

export default AddTodoSection;
