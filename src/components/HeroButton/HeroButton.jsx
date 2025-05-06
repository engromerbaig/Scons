// components/HeroButton/HeroButton.jsx
import React from 'react';

const HeroButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed left-0 top-1/2 -translate-y-1/2
        z-50
        bg-neon hover:bg-neon/90
        text-black 
        px-1 py-4
        rounded-r-2xl
        shadow-md
        transition
        flex items-center justify-center
        text-sm
        font-black
        [writing-mode:vertical-rl]
      "
      aria-label="Chat Now"
    >
      <span className="rotate-180">
        Chat Now
      </span>
    </button>
  );
};

export default HeroButton;
