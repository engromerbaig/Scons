import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatModal from '../ChatModal/ChatModal';

const Button = ({
  name,
  icon = null,
  type = 'button', // Default to 'button' to avoid undefined
  width = 'w-5',
  fontWeight = 'font-bold',
  fontSize = 'text-sm',
  className = '',
  bgColor = 'bg-black',
  textColor = 'white',
  hoverTextColor = 'white',
  hoverBgColor = 'bg-black',
  textAlign = 'justify-start',
  noIconChange = false,
  shadow = 'shadow-lg',
  onClick,
  disabled = false,
  link = null,
  openModal = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isInteracted = isHovered || isActive;

  const handleClick = (e) => {
    console.log('Button clicked:', name, 'Type:', type); // Debug
    if (openModal) {
      setIsModalOpen(true);
    }
    if (onClick) {
      onClick(e);
    }
    if (type === 'submit') {
      console.log('Submit button triggered'); // Debug
    }
  };

  return (
    <>
      {link ? (
        <Link to={link} className="inline-flex">
          <button
            type={type}
            className={`inline-flex flex-row items-center ${textAlign} cursor-pointer px-4 py-2 ${bgColor} rounded-full
              ${hoverBgColor ? `hover:${hoverBgColor} active:${hoverBgColor}` : ''}
              transition-all duration-300 relative overflow-hidden
              hover:${shadow} active:${shadow} ${className}`}
            disabled={disabled}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
          >
            {icon && (
              <img
                src={icon}
                alt={name}
                loading="lazy"
                className={`${width} aspect-square flex-shrink-0 ${noIconChange ? 'svg-black' : ''}`}
                style={{
                  filter: noIconChange
                    ? 'brightness(0) invert(0)'
                    : isInteracted
                    ? 'brightness(0) invert(1)'
                    : 'brightness(0) saturate(100%)',
                  transition: noIconChange ? 'none' : 'filter 0.3s ease',
                }}
              />
            )}
            <div className={`${icon ? 'ml-1 lg:ml-4' : ''} relative overflow-hidden`}>
              <p
                className={`${fontSize} ${fontWeight} transition-transform duration-300 whitespace-nowrap`}
                style={{
                  transform: isInteracted ? 'translateY(0)' : 'translateY(-200%)',
                  color: isInteracted ? hoverTextColor : textColor,
                }}
              >
                {name}
              </p>
              <p
                className={`${fontSize} ${fontWeight} absolute top-0 left-0 transition-transform duration-300 whitespace-nowrap`}
                style={{
                  transform: isInteracted ? 'translateY(200%)' : 'translateY(0)',
                  color: textColor,
                }}
              >
                {name}
              </p>
            </div>
          </button>
        </Link>
      ) : (
        <button
          type={type}
          className={`inline-flex flex-row items-center ${textAlign} cursor-pointer px-4 py-2 ${bgColor} rounded-full
            ${hoverBgColor ? `hover:${hoverBgColor} active:${hoverBgColor}` : ''}
            transition-all duration-300 relative overflow-hidden
            hover:${shadow} active:${shadow} ${className}`}
          disabled={disabled}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
        >
          {icon && (
            <img
              src={icon}
              alt={name}
              loading="lazy"
              className={`${width} aspect-square flex-shrink-0 ${noIconChange ? 'svg-black' : ''}`}
              style={{
                filter: noIconChange
                  ? 'brightness(0) invert(0)'
                  : isInteracted
                  ? 'brightness(0) invert(1)'
                  : 'brightness(0) saturate(100%)',
                transition: noIconChange ? 'none' : 'filter 0.3s ease',
              }}
            />
          )}
          <div className={`${icon ? 'ml-1 lg:ml-4' : ''} relative overflow-hidden`}>
            <p
              className={`${fontSize} ${fontWeight} transition-transform duration-300 whitespace-nowrap`}
              style={{
                transform: isInteracted ? 'translateY(0)' : 'translateY(-200%)',
                color: isInteracted ? hoverTextColor : textColor,
              }}
            >
              {name}
            </p>
            <p
              className={`${fontSize} ${fontWeight} absolute top-0 left-0 transition-transform duration-300 whitespace-nowrap`}
              style={{
                transform: isInteracted ? 'translateY(200%)' : 'translateY(0)',
                color: textColor,
              }}
            >
              {name}
            </p>
          </div>
        </button>
      )}

      {openModal && (
        <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Button;