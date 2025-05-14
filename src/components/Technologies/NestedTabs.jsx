import React, { useState, useRef } from "react";
import { technologiesData } from "./technologiesData";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import HorizontalListView from "../../utilities/HorizontalListView";

const NestedTabs = () => {
  const categories = Object.keys(technologiesData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const platforms = Object.keys(technologiesData[activeCategory]);

  // Refs for tab buttons to manage focus on keyboard navigation
  const tabsRef = useRef([]);

  // Keyboard navigation handler for tabs (ArrowLeft/Right for horizontal, ArrowUp/Down for vertical)
  const onKeyDown = (e, isHorizontal = false) => {
    const currentIndex = categories.indexOf(activeCategory);
    let newIndex = null;

    if (isHorizontal) {
      if (e.key === "ArrowRight") {
        newIndex = (currentIndex + 1) % categories.length;
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        newIndex = (currentIndex - 1 + categories.length) % categories.length;
        e.preventDefault();
      }
    } else {
      if (e.key === "ArrowDown") {
        newIndex = (currentIndex + 1) % categories.length;
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        newIndex = (currentIndex - 1 + categories.length) % categories.length;
        e.preventDefault();
      }
    }

    if (newIndex !== null) {
      setActiveCategory(categories[newIndex]);
      tabsRef.current[newIndex]?.focus();
    }
  };

  // Tab button component for reuse in both layouts
  const renderTabButton = (cat, index, isHorizontal = false) => {
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
        onKeyDown={(e) => onKeyDown(e, isHorizontal)}
        className={`px-4 py-2 m-2 rounded-full transition-colors text-left whitespace-nowrap ${
          isActive
            ? "tab-active-gradient text-black font-black"
            : "text-black hover:bg-gray-100"
        } ${isHorizontal ? "min-w-[120px, 150px]" : ""}`}
      >
        {cat}
      </button>
    );
  };

  // Content section (same for both layouts)
  const renderContent = () => {
    const panelId = `tabpanel-${activeCategory.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="flex-1 p-6 xl:p-8">
        {platforms.map((platform) => (
          <div
            key={platform}
            id={panelId}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory.toLowerCase().replace(/\s+/g, "-")}`}
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
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 max-w-xl gap-4">
              {technologiesData[activeCategory][platform].map((tech) => (
                <Button key={tech.name} name={tech.name} icon={tech.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto border-t border-gray-200 flex-col xl:flex-row">
      {/* Horizontal List View for tabs (below xl) */}
      <div className="xl:hidden w-full py-4 border-b xl:border-b-0 xl:border-r border-gray-200">
        <HorizontalListView
          perPage={3}
          gap="0.5rem"
          height="auto"
          className="px-4"
        >
          {categories.map((cat, index) => renderTabButton(cat, index, true))}
        </HorizontalListView>
      </div>

      {/* Vertical tabs (xl and above) */}
      <div
        role="tablist"
        aria-orientation="vertical"
        className="hidden xl:flex flex-col w-52 py-4 border-r border-gray-200"
      >
        {categories.map((cat, index) => renderTabButton(cat, index, false))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default NestedTabs;