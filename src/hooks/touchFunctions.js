// Handle touch start event
export const handleTouchStart = (e, touchStartX) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  // Handle touch end event and determine swipe direction
  export const handleTouchEnd = (e, touchStartX, touchEndX, handleNext, handlePrev) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe(touchStartX.current, touchEndX.current, handleNext, handlePrev);
  };
  
  // Handle swipe action (next or previous)
  export const handleSwipe = (touchStartX, touchEndX, handleNext, handlePrev) => {
    const swipeThreshold = 50; // Minimum swipe distance
    if (touchStartX - touchEndX > swipeThreshold) {
      handleNext();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      handlePrev();
    }
  };
  