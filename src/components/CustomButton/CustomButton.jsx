import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const CustomButton = ({ 
  option, 
  isSelected, 
  onClick, 
  link = null, 
  isMultiSelect = false, 
  textColor = 'text-bodyText', 
  textSize = 'text-base', 
  padding = 'px-6 py-2 lg:py-4', 
  width = 'w-64', 
  className = '' 
}) => {
  const handleClick = () => {
    if (!link && typeof onClick === 'function') {
      onClick(option);
    }
  };

  const buttonContent = (
    <div
      type="button"
      className={`relative ${width} z-20 text-center cursor-pointer ${padding} border-2 border-neon rounded-lg transition-all duration-200 group
        ${isSelected
          ? `bg-neon text-black font-bold`
          : `bg-transparent ${textColor} hover:bg-neon hover:text-black hover:font-bold`
        } ${className}`}
      onClick={handleClick}
    >
      {isMultiSelect && isSelected && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-200 animate-in fade-in slide-in-from-left-2">
          <Check className="w-6 h-6 text-black" />
        </div>
      )}
      <div className={`w-full flex justify-center ${isMultiSelect ? 'pl-4' : ''} ${textSize}`}>
        {option}
      </div>
    </div>
  );

  return link ? <Link to={link}>{buttonContent}</Link> : buttonContent;
};

export default CustomButton;
