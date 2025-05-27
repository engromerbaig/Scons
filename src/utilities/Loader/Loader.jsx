import React from 'react';

const angles = [0, 45, 90, 135, 180, 225, 270, 315];

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="relative w-full h-full">
        {angles.map((angle, index) => {
          const isLong = angle % 90 === 0;
          const lineHeight = isLong ? 50 : 30;
          // Distance from center to start of line (logo radius + gap)
          const startDistance = 50; // 40px (logo radius) + 10px gap
          
          return (
            <span
              key={index}
              className="absolute bg-black"
              style={{
                width: '8px',
                height: `${lineHeight}px`,
                top: '50%',
                left: '50%',
                transformOrigin: 'center bottom',
                transform: `translate(-50%, -100%) rotate(${angle}deg) translateY(-${startDistance}px)`
              }}
            />
          );
        })}
        
        <img 
          src="/favicon.svg" 
          alt="Scons Logo" 
          className="absolute"
          style={{
            width: '60px',
            height: '60px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
        />
      </div>
    </div>
  );
};

export default Loader;