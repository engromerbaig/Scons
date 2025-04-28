import React, { useState } from 'react';

// Default styles for inputs and selects
const defaultInputStyles =
    "m-1 p-2 md:p-3 border-b text-bodyText placeholder-bodyText border-bodyText bg-transparent w-full focus:outline-none";
const defaultSelectStyles =
    "m-1 p-2 md:p-3 border-b text-bodyText placeholder-bodyText border-bodyText bg-transparent w-full focus:outline-none appearance-none";

// m-1 p-2 lg:p-3 border-b text-white placeholder-white border-blue bg-transparent w-full focus:outline-none"
const errorStyles = "text-red-500 text-sm mt-1";

const FormField = ({ 
    type, 
    placeholder, 
    value, 
    onChange, 
    options = [], 
    inputStyles = defaultInputStyles, 
    selectStyles = defaultSelectStyles, 
    rows = 4 // Default to 4 rows for textareas
}) => {
    const [error, setError] = useState('');

    const validateInput = (value) => {
        if (type === "text" && placeholder.includes("Name")) {
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                setError("Name must contain only letters");
                return false;
            }
        } else if (type === "text" && placeholder.includes("Phone")) {
            // Validate phone number contains only digits and minimum length of 10 digits
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
    
        setError(''); // Clear error if validation passes
        return true;
    };
    

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(e); // Pass the change event back to the parent component
        validateInput(newValue); // Validate input
    };

    return (
        <div className="flex flex-col w-full">
            {type === "select" ? (
                <div className="relative w-full">
                    <select
                        value={value || ''}
                        onChange={handleChange}
                        className={`${selectStyles} z-20 appearance-none pr-10 focus:bg-innerBg focus:text-bodyText`} // Add focus styles
                    >
                        <option value="" disabled>
                            {placeholder} *
                        </option>
                        {options.map((option, index) => (
                            <option 
                                key={index} 
                                value={option}
                                className="bg-innerBg text-bodyText hover:bg-green-600" // Style options
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                    {/* Dropdown Icon */}
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 text-bodyText"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            ) : type === "textarea" ? (
                <textarea
                    placeholder={`${placeholder} *`}
                    value={value || ''}
                    onChange={handleChange}
                    rows={rows} // Set number of rows
                    className={`${inputStyles} resize-none`} // Prevent resizing
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
            {error && <span className={errorStyles}>{error}</span>}
        </div>
    );
};

export default FormField;