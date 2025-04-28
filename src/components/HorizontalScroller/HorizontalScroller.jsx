import React from "react";
import { useMediaQuery } from "react-responsive";
import "tailwindcss/tailwind.css";
import DesktopScroller from "./DesktopScroller";
import MobileScroller from "./MobileScroller";

const HorizontalScroller = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className="overflow-hidden">
      {isDesktop ? <DesktopScroller /> : <MobileScroller />}
    </div>
  );
};

export default HorizontalScroller;
