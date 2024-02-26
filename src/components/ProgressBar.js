// ProgressBar.js
import React from "react";

const ProgressBar = ({ progress, completedTasks }) => (
  <div className="mb-4 items-center rounded-3xl bg-[#576371] px-4 py-6 text-white">
    <h2 className="mb-4 text-2xl font-bold">Progress</h2>
    <div className="mb-4 h-1.5 w-full rounded-full bg-white">
      <div
        className={`h-1.5 rounded-full ${
          progress === 100 ? "bg-green-500" : "bg-blue-400"
        }`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p>{completedTasks} completed</p>
  </div>
);

export default ProgressBar;
