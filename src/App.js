import React from "react";
import TodoList from "./components/TodoList";

const App = () => {
  const username = "mattw";

  return (
    <div className="p-[60px]">
      <TodoList username={username} />
    </div>
  );
};

export default App;
