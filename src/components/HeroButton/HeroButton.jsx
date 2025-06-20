// components/HeroButton/HeroButton.jsx
import React from 'react';

const HeroButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        hidden lg:flex
        fixed left-0 top-1/2 -translate-y-1/2
        z-50
        bg-neon hover:bg-neon/90
        text-black 
        px-1 py-4
        rounded-r-2xl
        shadow-md
        transition-all duration-200
        items-center justify-center
        text-sm
        font-black
      "
      style={{
        writingMode: 'vertical-rl',
        textOrientation: 'mixed'
      }}
      aria-label="Chat Now"
    >
      <span 
        className="inline-block"
        style={{
          transform: 'rotate(180deg)',
          transformOrigin: 'center',
          display: 'inline-block'
        }}
      >
        Contact Us
      </span>
    </button>
  );
};

export default HeroButton;