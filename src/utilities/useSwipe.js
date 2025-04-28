// useSwipe.js
import { useRef } from 'react';

const useSwipe = (onSwipeLeft, onSwipeRight, swipeDistance = 30) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchEndX.current - touchStartX.current > swipeDistance) {
      // Swipe right
      onSwipeLeft();
    } else if (touchStartX.current - touchEndX.current > swipeDistance) {
      // Swipe left
      onSwipeRight();
    }
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useSwipe;