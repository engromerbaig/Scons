import React from "react";
import logoData from "../Hero/modules/logoData";
import "./style.css";

const Marquee = ({ isActive = true }) => {
  // Duplicate the array to create a seamless loop
  const loopedLogos = [...logoData, ...logoData, ...logoData, ...logoData, ...logoData];

  return (
    <div className={`ticker-wrap ${isActive ? "ticker-active" : ""}`}>
      <div className={`ticker ${isActive ? "animate" : "static"}`}>
        {loopedLogos.map((logoItem, index) => (
          <div key={index} className="ticker__item">
            <img
              src={logoItem.image}
              alt={`Logo ${index + 1}`}
              className="w-32 lg:w-40  object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
