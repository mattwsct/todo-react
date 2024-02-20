import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
  const username = 'mattw';

  return (
    <div>
      {/* Render TodoList component for the main page */}
      <TodoList username={username} />
    </div>
  );
};

export default App;
