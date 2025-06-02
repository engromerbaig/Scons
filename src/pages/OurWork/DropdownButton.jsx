import React, { useState } from "react";
import { FaUndo } from "react-icons/fa";

const DropdownButton = ({
  label,
  options,
  selectedValue,
  onChange,
  isNestedCategory,
  onReset,
  isMobile = false,
  isOptionClickable = () => true, // Default to all options clickable
  validOptions = [], // Default to empty array (all options valid if not provided)
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle option selection
  const handleSelect = (value) => {
    if (isOptionClickable(value)) {
      onChange(value);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-start relative w-full xl:w-auto" ref={dropdownRef}>
      <button
        type="button"
        className={`px-4 xl:px-8 py-2 rounded-full bg-gray-100 text-sm font-medium flex flex-col items-start justify-between cursor-pointer transition-colors relative ${
          isMobile ? "w-full xl:w-[300px]" : "xl:w-[300px]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ textAlign: "left" }}
      >
        <span className="text-10px text-gray-500 mb-0">{label}</span>
        <div className="w-full flex items-center justify-between">
          <span className="truncate text-xs text-black font-normal">
            {selectedValue || `Select ${label}`}
          </span>
          <span className="ml-2 flex items-center">
            {isNestedCategory ? (
              <FaUndo
                className="text-gray-500 hover:text-gray-800"
                size={18}
                onClick={(e) => {
                  e.stopPropagation();
                  onReset();
                }}
                title="Reset"
              />
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 8l4 4 4-4" stroke="#000" strokeWidth="2" fill="none" />
              </svg>
            )}
          </span>
        </div>
      </button>
      {isOpen && (
        <ul
          className={`absolute top-full left-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10 custom-scrollbar ${
            isMobile ? "w-full xl:w-[300px]" : "w-[260px]"
          }`}
        >
          {options.map((option) => (
            <li
              key={option}
              className={`
                px-4 py-2 text-sm
                ${
                  isOptionClickable(option)
                    ? "text-black hover:bg-gray-100 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }
                ${selectedValue === option && isOptionClickable(option) ? "bg-gray-50" : ""}
              `}
              onClick={() => handleSelect(option)}
              aria-disabled={!isOptionClickable(option)}
              title={
                !isOptionClickable(option)
                  ? `This ${label.toLowerCase()} is not available for the current selection`
                  : undefined
              }
            >
              {isNestedCategory && typeof option === "object" ? option.name : option}
            </li>
          ))}
        </ul>
      )}
      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 3px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #e2e8f0 #fff;
        }
      `}</style>
    </div>
  );
};

export default DropdownButton;