import React, { forwardRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = forwardRef(
  (
    {
      children,
      className = '',
      active = false,
      isInner = false,
      bgColor,
      bgSize = 'cover',
      bgSizeMob = 'cover',
      noGrid = false,
      showBlob = true,
      topShadow = false,
      bottomShadow = true, // New prop with default true
    },
    ref
  ) => {
    const backgroundImage = isInner ? '/inner-hero.png' : '/cube.png';
    const computedBgColor = bgColor || (isInner ? 'bg-innerBg' : 'bg-whiteBg');

    return (
      <div
        ref={ref}
        className={`${!noGrid ? 'animated-background' : ''} ${computedBgColor} ${active ? 'active' : ''} ${className}`}
        data-show-blob={showBlob}
        data-top-shadow={topShadow}
        data-bottom-shadow={bottomShadow} // Pass bottom shadow prop
        style={{
          '--bg-image': `url(${backgroundImage})`,
          '--bg-size': bgSize,
          '--bg-size-mob': bgSizeMob,
        }}
      >
        {children}
      </div>
    );
  }
);

AnimatedBackground.displayName = 'AnimatedBackground'; // For better debugging

export default AnimatedBackground;