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

  // Base button styles to match DropdownButton
  const buttonBaseStyles =
    "px-4 xl:px-8 py-2 rounded-full bg-gray-100 text-sm font-medium flex flex-col items-start w-full xl:w-[300px] transition-colors";

  return (
    <div className="flex flex-col items-start w-full gap-4 ">
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

        {/* Sort Buttons (shown only for blogs) */}
        {context === "blogs" && (
          <>
            <div className="flex flex-col items-start">
              <button
                className={`${buttonBaseStyles} ${
                  sortOrder === "desc" ? "bg-gray-200" : ""
                }`}
                onClick={() => setSortOrder("desc")}
                aria-label="Sort by newest first"
              >
                <span className="text-10px text-gray-500 mb-0">Sort</span>
                <div className="w-full flex items-center justify-between">
                  <span className="truncate text-xs text-black font-normal">
                    Recent First
                  </span>
                  <FaArrowUp className="w-3 h-3 text-black" />
                </div>
              </button>
            </div>
            <div className="flex flex-col items-start">
              <button
                className={`${buttonBaseStyles} ${
                  sortOrder === "asc" ? "bg-gray-200" : ""
                }`}
                onClick={() => setSortOrder("asc")}
                aria-label="Sort by oldest first"
              >
                <span className="text-10px text-gray-500 mb-0">Sort</span>
                <div className="w-full flex items-center justify-between">
                  <span className="truncate text-xs text-black font-normal">
                    Oldest First
                  </span>
                  <FaArrowDown className="w-3 h-3 text-black" />
                </div>
              </button>
            </div>
          </>
        )}

        {/* Reset Button */}
        <div className="flex flex-col items-start">
          <button
            className={buttonBaseStyles}
            onClick={resetFilters}
            aria-label="Reset filters"
          >
            <span className="text-10px text-gray-500 mb-0">Reset</span>
            <div className="w-full flex items-center justify-between">
              <span className="truncate text-xs text-black font-normal">
                Reset Filters
              </span>
              <FaUndo className="w-3 h-3 text-black" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;