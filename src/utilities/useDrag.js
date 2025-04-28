// useDrag.js
import { useRef } from 'react';

const useDrag = (onDragLeft, onDragRight, dragDistance = 50) => {
  const mouseStartX = useRef(0);
  const mouseEndX = useRef(0);
  const isDragging = useRef(false);

  const handleMouseDown = (event) => {
    mouseStartX.current = event.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current) return;
    mouseEndX.current = event.clientX;
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      if (mouseEndX.current - mouseStartX.current > dragDistance) {
        // Drag right
        onDragLeft();
      } else if (mouseStartX.current - mouseEndX.current > dragDistance) {
        // Drag left
        onDragRight();
      }
      isDragging.current = false;
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

export default useDrag;