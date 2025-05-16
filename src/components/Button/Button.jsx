import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  textAlign = "justify-start",
  noIconChange = false,
  shadow = "shadow-lg",
  onClick,
  link = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isInteracted = isHovered || isActive;

  const buttonContent = (
    <div
      className={`inline-flex flex-row items-center ${textAlign} cursor-pointer p-3 ${bgColor} rounded-full
        ${hoverBgColor ? `hover:${hoverBgColor} active:${hoverBgColor}` : ""}
        transition-all duration-300 relative overflow-hidden
        hover:${shadow} active:${shadow} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onClick={onClick}
    >
      {icon && (
        <img
          src={icon}
          alt={name}
          loading="lazy"
          className={`${width} aspect-square flex-shrink-0 ${
            noIconChange ? "svg-black" : ""
          }`}
          style={{
            filter: noIconChange
              ? "brightness(0) invert(0)"
              : isInteracted
              ? "brightness(0) invert(1)"
              : "brightness(0) saturate(100%)",
            transition: noIconChange ? "none" : "filter 0.3s ease",
          }}
        />
      )}

      <div className={`${icon ? "ml-1 lg:ml-4" : ""} relative overflow-hidden`}>
        <p
          className={`${fontSize} ${fontWeight} transition-transform duration-300 whitespace-nowrap`}
          style={{
            transform: isInteracted ? "translateY(0)" : "translateY(-200%)",
            color: isInteracted ? hoverTextColor : textColor,
          }}
        >
          {name}
        </p>
        <p
          className={`${fontSize} ${fontWeight} absolute top-0 left-0 transition-transform duration-300 whitespace-nowrap`}
          style={{
            transform: isInteracted ? "translateY(200%)" : "translateY(0)",
            color: textColor,
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="inline-flex">
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

export default Button;
