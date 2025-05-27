import React from 'react';
import './Loader.css';

const angles = [0, 45, 90, 135, 180, 225, 270, 315, 360];

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-icon">
        {angles.map((angle, index) => (
          <span
            key={index}
            className={`line ${angle % 90 === 0 ? 'line-long' : 'line-short'}`}
            style={{ transform: `rotate(${angle}deg) translateY(-80px)` }}
          ></span>
        ))}
        <img src="/favicon.svg" alt="Scons Logo" className="logo" />
      </div>
    </div>
  );
};

export default Loader;
