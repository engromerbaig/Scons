import React, { forwardRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = forwardRef(
  (
    {
      children,
      className = '',
      active = false,
      bgColor = 'bg-white',

      topShadow = false,
      bottomShadow = true,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`animated-background ${bgColor} ${active ? 'active' : ''} ${className}`}
        data-top-shadow={topShadow}
        data-bottom-shadow={bottomShadow}
      >
        {children}
      </div>
    );
  }
);

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
