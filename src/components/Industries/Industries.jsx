import React, { useRef, useState } from "react";
import Heading from "../Heading/Heading";
import industries from "./industriesData";
import { theme } from "../../theme";
import IndustryCard from "./modules/IndustryCard";

const Industries = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  // Drag-to-scroll logic
  let isDown = false;
  let startX, scrollLeft;

  const onMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add('cursor-grabbing');
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove('cursor-grabbing');
  };

  const onMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove('cursor-grabbing');
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className={`min-h-screen bg-black text-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start w-full py-20">
        <Heading
          text="We Serve Diverse Industries And Markets"
          centered={false}
          breakSpan={true}
          isAnimate={false}
          color="text-white"
          className="md:pr-20"
        />
      </div>
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto flex gap-6 pb-8 scrollbar-hide select-none cursor-grab"
        style={{ WebkitOverflowScrolling: "touch" }}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {industries.map((industry, idx) => (
          <IndustryCard
            key={idx}
            industry={industry}
            active={activeIndex === idx}
            onHover={() => setActiveIndex(idx)}
            onLeave={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default Industries;
