import React, { useState, useRef } from "react";
import { technologiesData } from "./technologiesData";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";

const NestedTabs = () => {
  const categories = Object.keys(technologiesData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const platforms = Object.keys(technologiesData[activeCategory]);

  // Refs for tab buttons to manage focus on keyboard navigation
  const tabsRef = useRef([]);

  // Keyboard navigation handler for vertical tabs (ArrowUp and ArrowDown)
  const onKeyDown = (e) => {
    const currentIndex = categories.indexOf(activeCategory);
    let newIndex = null;

    if (e.key === "ArrowDown") {
      newIndex = (currentIndex + 1) % categories.length;
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      newIndex = (currentIndex - 1 + categories.length) % categories.length;
      e.preventDefault();
    }

    if (newIndex !== null) {
      setActiveCategory(categories[newIndex]);
      tabsRef.current[newIndex]?.focus();
    }
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto border-t border-gray-200">
      {/* Left vertical tabs */}
      <div
        role="tablist"
        aria-orientation="vertical"
        className="flex flex-col w-60 border-r border-gray-200"
        onKeyDown={onKeyDown}
      >
        {categories.map((cat, index) => {
          const isActive = cat === activeCategory;
          const tabId = `tab-${cat.toLowerCase().replace(/\s+/g, "-")}`;
          const panelId = `tabpanel-${cat.toLowerCase().replace(/\s+/g, "-")}`;

          return (
            <button
              key={cat}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => setActiveCategory(cat)}
              className={`text-left px-4 py-3 m-2 rounded-full transition-colors  ${
                isActive
                  ? "bg-neon/50 text-black font-black"
                  : "text-black "
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Right content */}
      <div className="flex-1 p-6">
        {platforms.map((platform) => {
          const panelId = `tabpanel-${activeCategory
            .toLowerCase()
            .replace(/\s+/g, "-")}`;

          return (
            <div
              key={platform}
              id={panelId}
              role="tabpanel"
              aria-labelledby={`tab-${activeCategory
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              tabIndex={0}
              className="mb-6"
            >
              <Heading
                text={platform}
                fontWeight="font-black"
                size="text-30px"
                className="mb-4"
                centered={false}
              />
              <div className="grid grid-cols-3 max-w-xl gap-4">
                {technologiesData[activeCategory][platform].map((tech) => (
                  <Button key={tech.name} name={tech.name} icon={tech.icon} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NestedTabs;
