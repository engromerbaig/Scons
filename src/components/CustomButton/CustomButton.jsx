import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Check } from 'lucide-react';

const CustomButton = ({ 
  option, 
  isSelected, 
  onClick, 
  link = null, 
  isMultiSelect = false, 
  textColor = 'text-bodyText', // Default text color
  textSize = 'text-base', // Default text size
  padding = 'px-6 py-2 lg:py-4', // Default padding
  width = 'w-64', // Default width
  className = '' // Custom class names
}) => {
  const buttonContent = (
    <div
      className={`relative ${width} z-20 text-center cursor-pointer ${padding} border-2 border-neon rounded-lg transition-all duration-200 group
        ${isSelected
          ? `bg-neon text-black font-bold` // Keep text bold when selected
          : `bg-transparent ${textColor} hover:bg-neon hover:text-black hover:font-bold`
        } ${className}`} // Merge custom class names
      onClick={link ? null : () => onClick(option)}
    >
      {/* Animated checkmark */}
      {isMultiSelect && isSelected && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-200 animate-in fade-in slide-in-from-left-2">
          <Check className="w-6 h-6 text-black" />
        </div>
      )}
      
      {/* Text container to maintain centering regardless of checkmark */}
      <div className={`w-full flex justify-center ${isMultiSelect ? 'pl-4' : ''} ${textSize}`}>
        {option}
      </div>
    </div>
  );

  return link ? (
    <Link to={link}>{buttonContent}</Link> // Use Link for navigation
  ) : (
    buttonContent
  );
};

export default CustomButton;
