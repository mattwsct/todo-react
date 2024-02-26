// FilterDropdown.js
import React from "react";

const FilterDropdown = ({ filterOption, handleFilterChange }) => (
  <div className="mb-4">
    <select
      id="filter"
      value={filterOption}
      onChange={handleFilterChange}
      className="rounded-3xl border p-2"
    >
      <option value="all">All</option>
      <option value="done">Done</option>
      <option value="notDone">Not Done</option>
    </select>
  </div>
);

export default FilterDropdown;
