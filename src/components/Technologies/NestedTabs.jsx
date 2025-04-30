import React, { useState } from "react";

import { dummyData } from "./dummyData";

const NestedTabs = () => {
  const categories = Object.keys(dummyData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const platforms = Object.keys(dummyData[activeCategory]);

  return (
    <div className="flex w-full max-w-6xl mx-auto border-t border-gray-200 ">
      {/* Left vertical tabs */}
      <div className="flex flex-col w-48  border-r border-gray-200">
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
            <h3 className="text-xl font-bold mb-4">{platform}</h3>
            <div className="grid grid-cols-3 gap-4">
              {dummyData[activeCategory][platform].map(({ name, icon }) => (
                <div
                  key={name}
                  className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestedTabs;
