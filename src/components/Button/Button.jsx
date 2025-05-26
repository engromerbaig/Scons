import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatModal from '../ChatModal/ChatModal';

const Button = ({
  name,
  icon = null,
  type = 'button',
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
  isLoading = false, // New prop to receive loading state from parent
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isInteracted = isHovered || isActive;

  const handleClick = (e) => {
    console.log('Button clicked:', name, 'Type:', type);
    if (openModal) {
      setIsModalOpen(true);
    }
    if (onClick) {
      onClick(e);
    }
  };

  // Ensure button text doesn't shift by reserving space for the icon
  const iconContainerStyle = {
    width: isLoading || icon ? '1.25rem' : '0',
    marginRight: isLoading || icon ? '0.25rem' : '0',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
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
            <div style={iconContainerStyle}>
              {isLoading ? (
                <svg
                  className={`animate-spin h-5 w-5 ${isInteracted && !disabled ? 'text-white' : 'text-neon'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                icon && (
                  <img
                    src={icon}
                    alt={name}
                    loading="lazy"
                    className={`${width} aspect-square flex-shrink-0 ${noIconChange ? 'svg-black' : ''}`}
                    style={{
                      filter: noIconChange
                        ? 'brightness(0) invert(0)'
                        : isInteracted && !disabled
                        ? 'brightness(0) invert(1)'
                        : 'brightness(0) saturate(100%)',
                      transition: noIconChange ? 'none' : 'filter 0.3s ease',
                    }}
                  />
                )
              )}
            </div>
            <div className="relative overflow-hidden">
              <p
                className={`${fontSize} ${fontWeight} transition-transform duration-300 whitespace-nowrap`}
                style={{
                  transform: isInteracted && !disabled ? 'translateY(0)' : 'translateY(-200%)',
                  color: isInteracted && !disabled ? hoverTextColor : textColor,
                }}
              >
                {isLoading && type === 'submit' ? 'Submitting' : name}
              </p>
              <p
                className={`${fontSize} ${fontWeight} absolute top-0 left-0 transition-transform duration-300 whitespace-nowrap`}
                style={{
                  transform: isInteracted && !disabled ? 'translateY(200%)' : 'translateY(0)',
                  color: textColor,
                }}
              >
                {isLoading && type === 'submit' ? 'Submitting' : name}
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
          <div style={iconContainerStyle}>
            {isLoading ? (
              <svg
                className={`animate-spin h-5 w-5 ${isInteracted && !disabled ? 'text-white' : 'text-neon'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="black"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="black"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              icon && (
                <img
                  src={icon}
                  alt={name}
                  loading="lazy"
                  className={`${width} aspect-square flex-shrink-0 ${noIconChange ? 'svg-black' : ''}`}
                  style={{
                    filter: noIconChange
                      ? 'brightness(0) invert(0)'
                      : isInteracted && !disabled
                      ? 'brightness(0) invert(1)'
                      : 'brightness(0) saturate(100%)',
                    transition: noIconChange ? 'none' : 'filter 0.3s ease',
                  }}
                />
              )
            )}
          </div>
          <div className="relative overflow-hidden">
            <p
              className={`${fontSize} ${fontWeight} transition-transform duration-300 whitespace-nowrap`}
              style={{
                transform: isInteracted && !disabled ? 'translateY(0)' : 'translateY(-200%)',
                color: isInteracted && !disabled ? hoverTextColor : textColor,
              }}
            >
              {isLoading && type === 'submit' ? 'Submitting' : name}
            </p>
            <p
              className={`${fontSize} ${fontWeight} absolute top-0 left-0 transition-transform duration-300 whitespace-nowrap`}
              style={{
                transform: isInteracted && !disabled ? 'translateY(200%)' : 'translateY(0)',
                color: textColor,
              }}
            >
              {isLoading && type === 'submit' ? 'Submitting' : name}
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