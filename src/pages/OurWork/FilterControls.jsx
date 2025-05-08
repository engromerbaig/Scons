import React from "react";
import { FaUndo } from "react-icons/fa";

const FilterControls = ({
  selectedService,
  selectedTechnology,
  sortOrder,
  uniqueServices,
  uniqueTechnologies,
  handleServiceChange,
  handleTechnologyChange,
  setSortOrder,
  resetFilters,
}) => {
  return (
    <div className="flex flex-col items-start gap-4 mt-8">
      {/* Service Tabs */}
      <div className="flex flex-wrap gap-4">
        {uniqueServices.map((service) => (
          <button
            key={service}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedService === service ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleServiceChange(service)}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          className="px-10 py-4  rounded-full bg-grayBg text-sm"
          value={selectedTechnology}
          onChange={(e) => handleTechnologyChange(e.target.value)}
        >
          {uniqueTechnologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>

        <button
          className="px-4 py-2 border rounded-md text-sm flex items-center gap-2"
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
        >
          {sortOrder === "desc" ? "Oldest" : "Latest"}
        </button>

        <button
          className="px-4 py-2 border rounded-md text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors"
          onClick={resetFilters}
        >
          <FaUndo />
        </button>
      </div>
    </div>
  );
};

export default FilterControls;