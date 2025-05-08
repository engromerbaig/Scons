import React, { useState } from "react";
import { FaUndo } from "react-icons/fa";

const DropdownButton = ({
  label,
  options,
  selectedValue,
  onChange,
  isNestedCategory,
  onReset,
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
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-start relative" ref={dropdownRef}>
      <label className="text-xs text-gray-600 mb-1">{label}</label>
      <button
        type="button"
        className="px-8 py-4 rounded-full bg-gray-100 text-sm font-medium flex items-center justify-between cursor-pointer w-[220px] border border-gray-200 hover:border-gray-400 transition-colors relative"
        onClick={() => setIsOpen(!isOpen)}
        style={{ textAlign: "left" }}
      >
        <span className="truncate">{selectedValue || `Select ${label}`}</span>
        <span className="ml-2 flex items-center">
          {isNestedCategory ? (
            <FaUndo
              className="text-gray-500 hover:text-gray-800"
              size={16}
              onClick={e => {
                e.stopPropagation();
                onReset();
              }}
              title="Reset"
            />
          ) : (
            // Caret
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M6 8l4 4 4-4" stroke="#000" strokeWidth="2" fill="none" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <ul className="absolute top-full left-0 mt-1 w-[220px] max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10 custom-scrollbar">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
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
