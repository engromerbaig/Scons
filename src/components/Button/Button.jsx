import React, { useState } from "react";

const Button = ({
  name,
  icon = null,
  width = "w-5",
  fontWeight = "font-medium",
  fontSize = "text-20px",
  className = "",
  bgColor = "bg-grayBg",
  textColor = "black",
  hoverTextColor = "white",
  hoverBgColor = "bg-black",
  textAlign="justify-start",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`inline-flex flex-row items-center ${textAlign} cursor-pointer p-3 ${bgColor} rounded-full ${hoverBgColor ? "hover:" + hoverBgColor : ""
        } transition-all duration-300 relative overflow-hidden hover:shadow-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Conditionally Render Icon */}
      {icon && (
        <img
          src={icon}
          alt={name}
          className={`${width} aspect-square flex-shrink-0`}
          style={{
            filter: isHovered
              ? "brightness(0) invert(1)"
              : "brightness(0) saturate(100%)",
          }}
        />
      )}

      {/* Text */}
      <div className={`${icon ? "ml-1 lg:ml-4" : ""} relative overflow-hidden`}>
        <p
          className={`${fontSize} ${fontWeight} transition-transform duration-300 whitespace-nowrap`}
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(-200%)",
            color: isHovered ? hoverTextColor : textColor,
          }}
        >
          {name}
        </p>
        <p
          className={`${fontSize} ${fontWeight} absolute top-0 left-0 transition-transform duration-300 whitespace-nowrap`}
          style={{
            transform: isHovered ? "translateY(200%)" : "translateY(0)",
            color: textColor,
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
};

export default Button;
