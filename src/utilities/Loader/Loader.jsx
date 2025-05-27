import React from 'react';

const angles = [0, 45, 90, 135, 180, 225, 270, 315];

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen relative">
      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .animate-line-0 { animation: fadeInOut 1.5s ease-in-out infinite; animation-delay: 0s; }
        .animate-line-1 { animation: fadeInOut 1.5s ease-in-out infinite; animation-delay: 0.1s; }
        .animate-line-2 { animation: fadeInOut 1.5s ease-in-out infinite; animation-delay: 0.2s; }
        .animate-line-3 { animation: fadeInOut 1.5s ease-in-out infinite; animation-delay: 0.3s; }
      `}</style>
      
      <div className="relative w-full h-full">
        {angles.map((angle, index) => {
          const isLong = angle % 90 === 0;
          const lineHeight = isLong ? 50 : 30;
          const startDistance = 50;
          
          // Left semicircle: angles 90 to 270 (top to bottom on left side)
          const isLeftSide = angle >= 90 && angle <= 270;
          const leftSideIndex = isLeftSide ? 
            [90, 135, 180, 225, 270].indexOf(angle) : -1;
          
          return (
            <span
              key={index}
              className={`absolute bg-black ${
                isLeftSide && leftSideIndex !== -1 
                  ? `animate-line-${leftSideIndex}` 
                  : ''
              }`}
              style={{
                width: '8px',
                height: `${lineHeight}px`,
                top: '50%',
                left: '50%',
                transformOrigin: 'center bottom',
                transform: `translate(-50%, -100%) rotate(${angle}deg) translateY(-${startDistance}px)`,
                opacity: isLeftSide ? 0.3 : 1
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