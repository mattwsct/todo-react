// FilterDropdown.js
import React from 'react';

const FilterDropdown = ({ filterOption, handleFilterChange }) => (
  <div className="mb-4">
    <select
      id="filter"
      value={filterOption}
      onChange={handleFilterChange}
      className="border p-2 rounded-3xl"
    >
      <option value="all">All</option>
      <option value="done">Done</option>
      <option value="notDone">Not Done</option>
    </select>
  </div>
);

export default FilterDropdown;
