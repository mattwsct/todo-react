import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import FilterDropdown from "./FilterDropdown";
import TodoItemsList from "./TodoItemsList";
import AddTodoSection from "./AddTodoSection";
import apiService from "../services/apiService";

const TodoList = ({ username }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.get(`/api/${username}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?",
    );
    if (!confirmDelete) {
      return;
    }

    try {
      setIsLoading(true);
      await apiService.delete(`/api/${username}/todos/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
      setPopupMessage({ text: "Todo deleted successfully", color: "green" });
      setTimeout(() => setPopupMessage(null), 3000);
    } catch (error) {
      console.error("Error deleting todo:", error.response);
      setPopupMessage({
        text: error.response?.data?.error || "Error deleting todo",
        color: "red",
      });
      setTimeout(() => setPopupMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTodo = async (todoId) => {
    try {
      setIsLoading(true);
      await apiService.put(`/api/${username}/todos/${todoId}/toggle`);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === todoId ? { ...todo, isDone: !todo.isDone } : todo,
        ),
      );
    } catch (error) {
      console.error("Error toggling todo:", error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTodo = async () => {
    try {
      setIsLoading(true);
      await apiService.post(`/api/${username}/todos/create`, { text: newTodo });
      fetchTodos();
      setNewTodo("");
      setPopupMessage({ text: "Item has been added", color: "green" });
    } catch (error) {
      console.error("Error creating todo:", error);
      setPopupMessage({
        text: error.response?.data?.error || "Error creating todo",
        color: "red",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setPopupMessage(null), 3000);
    }
  };

  const handleFilterChange = ({ target }) => {
    setFilterOption(target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && newTodo.trim() !== "") {
      handleCreateTodo();
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const completedTasks = todos.filter((todo) => todo.isDone).length;
  const totalTasks = todos.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const filteredTodos =
    filterOption === "done"
      ? todos.filter((todo) => todo.isDone)
      : filterOption === "notDone"
        ? todos.filter((todo) => !todo.isDone)
        : todos;

  return (
    <div className="container mx-auto max-w-[720px] rounded-3xl bg-[#f5f5f5] px-[100px] py-[60px]">
      {isLoading && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          style={{ zIndex: 9999 }}
        >
          <div className="loader h-32 w-32 rounded-full border-8 border-t-8 border-gray-200 ease-linear"></div>
        </div>
      )}

      <ProgressBar progress={progress} completedTasks={completedTasks} />
      <div className="flex justify-between">
        <h2 className="mb-4 text-2xl font-bold">To-dos</h2>
        <FilterDropdown
          filterOption={filterOption}
          handleFilterChange={handleFilterChange}
        />
      </div>

      <AddTodoSection
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        isAddingTodo={isLoading}
        handleCreateTodo={handleCreateTodo}
        handleEnterKeyPress={handleEnterKeyPress}
      />
      <TodoItemsList
        filteredTodos={filteredTodos}
        handleDeleteTodo={handleDeleteTodo}
        handleToggleTodo={handleToggleTodo}
      />

      {popupMessage && (
        <div
          className={`fixed bottom-4 right-4 rounded-3xl border-2 p-4 shadow ${
            popupMessage.color === "red"
              ? "border-red-500 bg-white text-red-500"
              : "bg-white  text-green-500"
          }`}
        >
          {popupMessage.text}
        </div>
      )}
    </div>
  );
};

export default TodoList;
