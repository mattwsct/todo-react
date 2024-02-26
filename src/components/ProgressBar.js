// ProgressBar.js
import React from 'react';

const ProgressBar = ({ progress, completedTasks }) => (
  <div className="items-center mb-4 bg-[#576371] text-white rounded-3xl px-4 py-6">
    <h2 className="text-2xl font-bold mb-4">Progress</h2>
    <div className="w-full rounded-full h-1.5 mb-4 bg-white">
      <div
        className={`h-1.5 rounded-full ${
          progress === 100 ? 'bg-green-500' : 'bg-blue-400'
        }`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p>{completedTasks} completed</p>
  </div>
);

export default ProgressBar;
