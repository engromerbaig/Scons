import DropdownButton from "./DropdownButton"; // adjust path as needed
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
  isNestedService, // Pass this prop to indicate if a nested category is selected
  isNestedTech,    // Same for technologies if needed
  resetService,
  resetTech,
}) => {
  return (
    <div className="flex flex-col items-start gap-4 mt-8">
      <div className="flex flex-wrap gap-4 items-start">
        <DropdownButton
          label="Services"
          options={uniqueServices}
          selectedValue={selectedService}
          onChange={handleServiceChange}
          isNestedCategory={isNestedService}
          onReset={resetService}
        />
        <DropdownButton
          label="Technologies"
          options={uniqueTechnologies}
          selectedValue={selectedTechnology}
          onChange={handleTechnologyChange}
          isNestedCategory={isNestedTech}
          onReset={resetTech}
        />
        {/* <button
          className="px-4 py-2 border rounded-md text-sm flex items-center gap-2"
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
        >
          {sortOrder === "desc" ? "Oldest" : "Latest"}
        </button> */}
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
