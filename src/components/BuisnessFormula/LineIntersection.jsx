import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LineIntersection = ({ stepIndex }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 400,
    height: 400,
  });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  // Calculate intersection point on left side
  const intersectionPoint = {
    x: 0,
    y: dimensions.height / 2,
  };

  // Calculate dot positions on right side
  const topDot = { x: dimensions.width, y: 0 };
  const middleDot = { x: dimensions.width, y: dimensions.height / 2 };
  const bottomDot = { x: dimensions.width, y: dimensions.height };

  // Calculate line lengths and angles
  const getLineProperties = (start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return { length, angle };
  };

  const topLine = getLineProperties(intersectionPoint, topDot);
  const middleLine = getLineProperties(intersectionPoint, middleDot);
  const bottomLine = getLineProperties(intersectionPoint, bottomDot);

  return (
    <div className="flex justify-between ">
      <div ref={containerRef} className="relative w-[400px] min-h-[400px]">
        {/* Three endpoints */}
        <motion.div
          className="absolute w-4 h-4 bg-blue rounded-full right-0 top-0 translate-x-1/2 -translate-y-1/2 z-10"
          animate={{ opacity: stepIndex === 0 ? 1 : 0.3 }} // Step 1: Top dot visible
          transition={{ duration: 0.3 }}
        ></motion.div>
        <motion.div
          className="absolute w-4 h-4 bg-blue rounded-full right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10"
          animate={{ opacity: stepIndex === 1 ? 1 : 0.3 }} // Step 2: Middle dot visible
          transition={{ duration: 0.3 }}
        ></motion.div>
        <motion.div
          className="absolute w-4 h-4 bg-blue rounded-full right-0 bottom-0 translate-x-1/2 translate-y-1/2 z-10"
          animate={{ opacity: stepIndex === 2 ? 1 : 0.3 }} // Step 3: Bottom dot visible
          transition={{ duration: 0.3 }}
        ></motion.div>

        {/* Top line */}
        <motion.div
          className="absolute h-1 bg-blue z-0"
          style={{
            position: "absolute",
            width: `${topLine.length}px`,
            left: `${intersectionPoint.x}px`,
            top: `${intersectionPoint.y}px`,
            transformOrigin: "left center",
            transform: `rotate(${topLine.angle}deg)`,
          }}
          animate={{ opacity: stepIndex === 0 ? 1 : 0.3 }} // Step 1: Top line visible
          transition={{ duration: 0.3 }}
        ></motion.div>

        {/* Middle line */}
        <motion.div
          className="absolute h-1 bg-blue z-0"
          style={{
            position: "absolute",
            width: `${middleLine.length}px`,
            left: `${intersectionPoint.x}px`,
            top: `${intersectionPoint.y}px`,
            transformOrigin: "left center",
            transform: `rotate(${middleLine.angle}deg)`,
          }}
          animate={{ opacity: stepIndex === 1 ? 1 : 0.3 }} // Step 2: Middle line visible
          transition={{ duration: 0.3 }}
        ></motion.div>

        {/* Bottom line */}
        <motion.div
          className="absolute h-1 bg-blue z-0"
          style={{
            position: "absolute",
            width: `${bottomLine.length}px`,
            left: `${intersectionPoint.x}px`,
            top: `${intersectionPoint.y}px`,
            transformOrigin: "left center",
            transform: `rotate(${bottomLine.angle}deg)`,
          }}
          animate={{ opacity: stepIndex === 2 ? 1 : 0.3 }} // Step 3: Bottom line visible
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default LineIntersection;