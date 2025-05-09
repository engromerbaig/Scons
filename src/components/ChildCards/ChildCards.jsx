import React from "react";
import ContainerComponent from "./modules/ContainerComponent";
import containersData from "./containersData";

const ChildCards = ({ startIndex, endIndex }) => {
  return (
    <div className="relative space-x-0">
      <div className="flex overflow-x-auto whitespace-nowrap w-screen scrollbar-hide scroll-container">
        {containersData.slice(startIndex, endIndex).map((containerData, index) => (
          <ContainerComponent
            key={index}
            logo={containerData.logo}
            heading={containerData.heading}
            number={containerData.number}
            text={containerData.text}
          />
        ))}
      </div>
    </div>
  );
};

export default ChildCards;
