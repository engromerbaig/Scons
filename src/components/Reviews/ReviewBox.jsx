import React from 'react';
import starIcon from "../../assets/icons/services/ServicesDetails/star.svg";
import BodyText from "../BodyText/BodyText";

const ReviewBox = ({ logo, rating, review }) => {
  // Format the rating to always show 1 decimal place
  const formattedRating = rating.toFixed(1); // This will ensure 1 decimal place

  return (
    <div className="flex flex-col items-center border-2 border-neon justify-between rounded-3xl p-4 min-h-60 flex-grow">
      {/* Top bar */}
      <div className="flex flex-row justify-between w-full mb-4">
        {/* Left side: User Icon */}
        <img src={logo} alt="user icon" className="w-2/5" />

        {/* Right side: Star Icon + Rating */}
        <div className="flex items-center space-x-2">
          <img src={starIcon} alt="star icon" className="w-6 h-6" />
          <p className="font-bold">{formattedRating}</p>
        </div>
      </div>

      {/* Review description */}
      <div className="flex flex-col justify-start items-start flex-grow">
        <BodyText 
          text={review}
          size="text-base"
          lineHeight="leading-loose"
          centered={false}
        />
      </div>
    </div>
  );
};

export default ReviewBox;
