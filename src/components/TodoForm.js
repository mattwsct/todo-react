import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const TodoForm = ({ username, updateTodoList }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleCreateTodo = async () => {
    try {
      await apiService.post(`/api/${username}/todos/create`, { text: newTodo });

      // After creating a new todo, trigger the updateTodoList function
      updateTodoList();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleCreateTodo}>Create Todo</button>
    </div>
  );
};

export default TodoForm;
