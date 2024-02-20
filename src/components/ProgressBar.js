// ProgressBar.js
import React from 'react';

const ProgressBar = ({ progress, completedTasks }) => (
  <div className="items-center mb-4 bg-gray-600 text-white rounded-xl px-4 py-6">
    <h2 className="text-2xl font-bold mb-4">Progress</h2>
    <div className="w-full rounded-full h-1.5 mb-4 bg-white">
      <div
        className="bg-blue-400 h-1.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p>{completedTasks} completed</p>
  </div>
);

export default ProgressBar;
