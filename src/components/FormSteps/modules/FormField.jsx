import React, { useState, useRef, useEffect } from 'react';

// Default styles for inputs and selects
const defaultInputStyles =
  "m-1 p-2 md:p-3 border-b text-bodyText placeholder-bodyText border-bodyText bg-transparent w-full focus:outline-none";
const defaultSelectStyles =
  "m-1 p-2 md:p-3 border-b text-bodyText placeholder-bodyText border-bodyText bg-transparent w-full focus:outline-none appearance-none";

const errorStyles = "text-red-500 text-sm mt-1";

const FormField = ({
  type,
  placeholder,
  value,
  onChange,
  options = [],
  inputStyles = defaultInputStyles,
  selectStyles = defaultSelectStyles,
  rows = 4,
  hideErrorMessages = false,
}) => {
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateInput = (value) => {
    if (type === "text" && placeholder.includes("Name")) {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError("Name must contain only letters");
        return false;
      }
    } else if (type === "text" && placeholder.includes("Phone")) {
      if (!/^\d+$/.test(value)) {
        setError("Phone number must contain only digits");
        return false;
      } else if (value.length < 10) {
        setError("Phone number must be at least 10 digits long");
        return false;
      }
    } else if (type === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError("Please enter a valid email address");
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(e);
    if (newValue) validateInput(newValue);
    else setError('');
  };

  const handleOptionClick = (option) => {
    const syntheticEvent = { target: { value: option.value } };
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full" ref={dropdownRef}>
      {type === "select" ? (
        <div className="relative w-full">
          <button
            type="button"
            className={`${selectStyles} flex items-center justify-between`}
        
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="truncate text-grayText">{options.find(opt => opt.value === value)?.label || placeholder}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 8l4 4 4-4" stroke="#000" strokeWidth="2" fill="none" />
            </svg>
          </button>

          {isOpen && (
            <ul className="absolute top-full left-0 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10 custom-scrollbar">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="px-4 py-2  text-grayText hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
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
      ) : type === "textarea" ? (
        <textarea
          placeholder={`${placeholder} *`}
          value={value || ''}
          onChange={handleChange}
          rows={rows}
          className={`${inputStyles} resize-none`}
        />
      ) : (
        <input
          type={type}
          placeholder={`${placeholder} *`}
          value={value || ''}
          onChange={handleChange}
          className={inputStyles}
        />
      )}
      {!hideErrorMessages && error && <span className={errorStyles}>{error}</span>}
    </div>
  );
};

export default FormField;

