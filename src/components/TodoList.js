import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import FilterDropdown from './FilterDropdown';
import TodoItemsList from './TodoItemsList';
import AddTodoSection from './AddTodoSection';
import apiService from '../services/apiService';

const TodoList = ({ username }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filterOption, setFilterOption] = useState('all'); // 'all', 'done', 'notDone'
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await apiService.get(`/api/${username}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this todo?'
    );
    if (!confirmDelete) {
      return;
    }

    try {
      console.log(`Deleting todo with id ${todoId}`);
      const response = await apiService.delete(
        `/api/${username}/todos/${todoId}`
      );
      console.log('API response:', response);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
      setPopupMessage({ text: 'Todo deleted successfully', color: 'green' });
      setTimeout(() => setPopupMessage(null), 3000);
    } catch (error) {
      console.error('Error deleting todo:', error.response);
      setPopupMessage({
        text: error.response?.data?.error || 'Error deleting todo',
        color: 'red',
      });
      setTimeout(() => setPopupMessage(null), 3000);
    }
  };

  const handleToggleTodo = async (todoId) => {
    try {
      console.log(`Toggling todo with id ${todoId}`);
      const response = await apiService.put(
        `/api/${username}/todos/${todoId}/toggle`
      );
      console.log('API response:', response);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === todoId ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    } catch (error) {
      console.error('Error toggling todo:', error.response);
    }
  };

  const handleCreateTodo = async () => {
    try {
      setIsAddingTodo(true);
      await apiService.post(`/api/${username}/todos/create`, { text: newTodo });
      fetchTodos();
      setNewTodo('');
      setPopupMessage({ text: 'Item has been added', color: 'green' });
    } catch (error) {
      console.error('Error creating todo:', error);
      console.log('Detailed error response:', error.response);
      setPopupMessage({
        text: error.response?.data?.error || 'Error creating todo',
        color: 'red',
      });
    } finally {
      setIsAddingTodo(false);
      setTimeout(() => setPopupMessage(null), 3000); // Clear the message after 3 seconds
    }
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter' && newTodo.trim() !== '') {
      handleCreateTodo();
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  // Calculate the progress information based on all todos
  const completedTasks = todos.filter((todo) => todo.isDone).length;
  const totalTasks = todos.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // Filtering logic
  const filteredTodos =
    filterOption === 'done'
      ? todos.filter((todo) => todo.isDone)
      : filterOption === 'notDone'
      ? todos.filter((todo) => !todo.isDone)
      : todos;

  return (
    <div className="container mx-auto p-4 bg-gray-200 rounded-xl">
      <ProgressBar progress={progress} completedTasks={completedTasks} />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">To-dos</h2>
        <FilterDropdown
          filterOption={filterOption}
          handleFilterChange={handleFilterChange}
        />
      </div>

      <AddTodoSection
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        isAddingTodo={isAddingTodo}
        handleCreateTodo={handleCreateTodo}
        handleEnterKeyPress={handleEnterKeyPress}
      />
      <TodoItemsList
        filteredTodos={filteredTodos}
        handleDeleteTodo={handleDeleteTodo}
        handleToggleTodo={handleToggleTodo}
      />

      {/* Popup message */}
      {popupMessage && (
        <div
          className={`fixed bottom-4 right-4 p-4 border-2 rounded-3xl shadow ${
            popupMessage.color === 'red'
              ? 'text-red-500 border-red-500 bg-white'
              : 'text-green-500  bg-white'
          }`}
        >
          {popupMessage.text}
        </div>
      )}
    </div>
  );
};

export default TodoList;
