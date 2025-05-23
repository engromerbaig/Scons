import React, { useState, useRef } from "react";
import { faqData } from "./faqData";
import FAQItem from "./modules/FAQItem";
import HorizontalListView from "../../utilities/HorizontalListView";

const FAQNestedTabs = () => {
  const categories = Object.keys(faqData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeFAQ, setActiveFAQ] = useState(0); // Track active FAQ item
  const tabsRef = useRef([]);

  const handleFAQClick = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

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
      setActiveFAQ(0); // Reset active FAQ when switching categories
      tabsRef.current[newIndex]?.focus();
    }
  };

  const renderTabButton = (cat, index, isHorizontal = false) => {
    const isActive = cat === activeCategory;
    const tabId = `faq-tab-${cat.toLowerCase().replace(/\s+/g, "-")}`;
    const panelId = `faq-tabpanel-${cat.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <button
        key={cat}
        id={tabId}
        role="tab"
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
        ref={(el) => (tabsRef.current[index] = el)}
        onClick={() => {
          setActiveCategory(cat);
          setActiveFAQ(0); // Reset active FAQ on category change
        }}
        onKeyDown={(e) => onKeyDown(e, isHorizontal)}
        className={`px-4 py-2 m-2 rounded-r-full transition-colors text-left whitespace-nowrap ${
          isActive
            ? "tab-active-gradient text-black font-black"
            : "text-black hover:bg-gray-100"
        } ${isHorizontal ? "min-w-[120px]" : ""}`}
      >
        {cat}
      </button>
    );
  };

  const renderContent = () => {
    const panelId = `faq-tabpanel-${activeCategory.toLowerCase().replace(/\s+/g, "-")}`;
    const faqs = faqData[activeCategory];

    return (
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`faq-tab-${activeCategory.toLowerCase().replace(/\s+/g, "-")}`}
        tabIndex={0}
        className="flex-1 space-y-6  px-6 xl:px-8 w-full transition-opacity duration-300 ease-in-out"
      >
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isActive={activeFAQ === index}
            onClick={() => handleFAQClick(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto  flex-col xl:flex-row">
      {/* Horizontal List View for mobile */}
      <div className="xl:hidden w-full py-4 border-b border-gray-200">
        <HorizontalListView showArrow={false} perPage={3} gap="0.5rem" height="auto" className="px-4">
          {categories.map((cat, index) => renderTabButton(cat, index, true))}
        </HorizontalListView>
      </div>

      {/* Vertical Tabs for xl and above */}
      <div
        role="tablist"
        aria-orientation="vertical"
        className="hidden xl:flex flex-col w-52 py-4 " 
      >
        {categories.map((cat, index) => renderTabButton(cat, index, false))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default FAQNestedTabs;