import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const AnimatedArrow = ({ text = "More Case Studies", to = "/", className = "" }) => {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-2 transition-all duration-300 cursor-pointer ${className}`}
    >
      <span className="transition-all text-25px duration-300 group-hover:font-bold group-hover:-translate-x-1">
        {text}
      </span>
      <FaLongArrowAltRight 
        className="transition-all font-medium text-25px duration-300 group-hover:text-neon group-hover:font-bold transform group-hover:translate-x-2"
      />
    </Link>
  );
};

export default AnimatedArrow;
