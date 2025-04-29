import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';

const Carousel = ({ items, itemType, bulletColor }) => {
  const controls = useAnimation();
  const carouselRef = useRef(null);

  // Duplicate items for seamless looping
  const extendedItems = [...items, ...items];

  useEffect(() => {
    const totalWidth = items.length * 25; // Each item takes 25% of width
    const duration = items.length * 10; // 5 seconds per item for smooth scrolling

    controls.start({
      x: -totalWidth + '%',
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: duration,
        ease: 'linear',
      },
    });

    return () => controls.stop();
  }, [controls, items.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        ref={carouselRef}
        className="flex"
        animate={controls}
        style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-shrink-0 w-1/4 flex items-center justify-center relative"
          >
            {itemType === 'image' ? (
              <img
                src={item.image}
                alt={`carousel-item-${index}`}
                className="max-h-8 w-24 object-contain "
              />
            ) : (
              <div className="flex items-center">
                {index > 0 && (
                  <span
                    className={`${bulletColor} rounded-full w-3 h-3 mx-2`}
                  />
                )}
                <p className="text-gray-600 text-lg">{item.text}</p>
                {index < extendedItems.length - 1 && (
                  <span
                    className={`${bulletColor} rounded-full w-3 h-3 mx-2`}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  itemType: PropTypes.oneOf(['image', 'text']).isRequired,
  bulletColor: PropTypes.string,
};

Carousel.defaultProps = {
  bulletColor: 'bg-green-400',
};

export default Carousel;