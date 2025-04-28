// InfiniteCarousel.js
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css'

const InfiniteCarousel = ({ 
  children, 
  width, 
  height, 
  duration, 
  reverse, 
  widthMob, 
  heightMob,
  hoverPause = false // New prop with default value
}) => {
  const sliderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (sliderRef.current) {
      observerRef.current.observe(sliderRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className={`slider ${isVisible ? 'animate' : ''} ${hoverPause ? 'hover-pause' : ''}`}
      style={{
        '--width': window.innerWidth < 768 ? widthMob : width,
        '--height': window.innerWidth < 768 ? heightMob : height,
        '--quantity': React.Children.count(children),
        '--duration': duration,
      }}
    >
      <div className="list">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="item"
            style={{ '--position': index + 1 }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

InfiniteCarousel.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
  widthMob: PropTypes.string,
  heightMob: PropTypes.string,
  hoverPause: PropTypes.bool, // New prop type
};

InfiniteCarousel.defaultProps = {
  reverse: false,
  hoverPause: false, // Default value
};

export default InfiniteCarousel;