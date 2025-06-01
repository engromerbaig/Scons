import DropdownButton from "./DropdownButton"; // Adjust path as needed
import { FaUndo, FaArrowUp, FaArrowDown } from "react-icons/fa";

const FilterControls = ({
  selectedService,
  selectedTechnology,
  selectedDate,
  sortOrder,
  setSortOrder,
  uniqueServices,
  uniqueTechnologies,
  uniqueDates,
  handleServiceChange,
  handleTechnologyChange,
  handleDateChange,
  resetFilters,
  isNestedService = false,
  isNestedTech = false,
  isPackages = false,
  isBlogs = false,
  isServices = true,
}) => {
  // Ensure only one context is active
  const context = isBlogs ? "blogs" : isPackages ? "packages" : "services";

  return (
    <div className="flex flex-col items-start w-full justify-center gap-4 mt-8">
      <div className="flex flex-wrap gap-2 xl:gap-4 items-center">
        {/* Category/Service Dropdown */}
        <DropdownButton
          label={isPackages ? "Category" : isBlogs ? "Categories" : "Services"}
          options={uniqueServices}
          selectedValue={selectedService}
          onChange={handleServiceChange}
          isNestedCategory={isNestedService}
        />

        {/* Technology/Author Dropdown (shown for services or blogs) */}
        {(context === "services" || context === "blogs") && (
          <DropdownButton
            label={context === "blogs" ? "Authors" : "Technologies"}
            options={uniqueTechnologies}
            selectedValue={selectedTechnology}
            onChange={handleTechnologyChange}
            isNestedCategory={isNestedTech}
          />
        )}

        {/* Date Dropdown (shown only for blogs) */}
        {context === "blogs" && uniqueDates && (
          <DropdownButton
            label="Date"
            options={uniqueDates}
            selectedValue={selectedDate}
            onChange={handleDateChange}
            isNestedCategory={false}
          />
        )}

        {/* Sort Icons (shown only for blogs) */}
        {context === "blogs" && (
          <>
            <button
              className={`px-4 py-2 border rounded-md text-sm flex items-center gap-2 ${
                sortOrder === "desc" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSortOrder("desc")}
              aria-label="Sort by newest first"
            >
              Recent First
              <FaArrowUp />
            </button>
            <button
              className={`px-4 py-2 border rounded-md text-sm flex items-center gap-2 ${
                sortOrder === "asc" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSortOrder("asc")}
              aria-label="Sort by oldest first"
            >
              Oldest First
              <FaArrowDown />
            </button>
          </>
        )}

        {/* Reset Button */}
        <button
          className="px-4 py-2 border rounded-md text-sm flex items-center gap-2"
          onClick={resetFilters}
          aria-label="Reset filters"
        >
          <FaUndo />
        </button>
      </div>
    </div>
  );
};

export default FilterControls;