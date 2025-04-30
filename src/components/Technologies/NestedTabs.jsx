import React, { useState } from "react";
import { technologiesData } from "./technologiesData";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";

const NestedTabs = () => {
  const categories = Object.keys(technologiesData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const platforms = Object.keys(technologiesData[activeCategory]);

  return (
    <div className="flex w-full max-w-6xl mx-auto border-t border-gray-200">
      {/* Left vertical tabs */}
      <div className="flex flex-col w-48 border-r border-gray-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-left px-4 py-3 m-2 rounded-full font-semibold transition-colors ${
              cat === activeCategory
                ? "bg-neon/25 text-green-900 font-bold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Right content */}
      <div className="flex-1 p-6">
        {platforms.map((platform) => (
          <div key={platform} className="mb-6">
            <Heading
              text={platform}
              fontWeight="font-black"
              size="text-30px"
              className="mb-4"
                centered={false}
                />
            <div className="grid grid-cols-3 max-w-xl gap-4">
              {technologiesData[activeCategory][platform].map((tech) => (
                // Use the imported Button component
                <Button key={tech.name} name={tech.name} icon={tech.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestedTabs;
