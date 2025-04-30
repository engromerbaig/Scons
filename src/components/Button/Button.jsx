import React, { useState } from "react";

const Button = ({
  name,
  icon,
  width = "w-5", // Default icon width
  className = "", // Extra classes
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`inline-flex flex-row items-center justify-start cursor-pointer p-3 bg-grayBg rounded-full hover:bg-black transition-all duration-300 relative overflow-hidden hover:shadow-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <img
        src={icon}
        alt={name}
        className={`${width} aspect-square flex-shrink-0`}
        style={{
          filter: isHovered
            ? "brightness(0) invert(1)" // White on hover
            : "brightness(0) saturate(100%)", // Black initially
        }}
      />

      {/* Text with Slide Effect */}
      <div className="ml-1 lg:ml-4 relative overflow-hidden">
        <p
          className="text-sm lg:text-25px font-bold transition-transform duration-300 whitespace-nowrap"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(-100%)",
            color: isHovered ? "white" : "black",
          }}
        >
          {name}
        </p>
        <p
          className="text-sm lg:text-25px font-bold absolute top-0 left-0 transition-transform duration-300 whitespace-nowrap"
          style={{
            transform: isHovered ? "translateY(100%)" : "translateY(0)",
            color: "black",
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
};

export default Button;
