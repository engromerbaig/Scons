// Reviews.js
import React, { useEffect, useRef, useState } from "react";
import Heading from "../Heading/Heading";
import Highlights from "../UniqueApproach/modules/Highlights";
import ReviewBox from "./ReviewBox";
import { reviewData } from "./reviewData";
import InfiniteCarousel from "../InfiniteCarousel/InfiniteCarousel";
import { theme } from "../../theme";

const Reviews = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Set visibility true for immediate animation (if needed)
  }, []);

  return (
    <div className={` ${theme.layoutPages.paddingBottom}`}>
      {/* Headings Section */}
   

      {/* Highlights Section */}
      {/* <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
        <Highlights />
      </div> */}

      {/* Carousel Section */}
      <InfiniteCarousel
        width="400px"
        height="240px"
          widthMob="300px"
          heightMob="240px"
        duration="40s"
      >
        {reviewData.map((review, index) => (
          <ReviewBox
            key={index}
            logo={review.logo}
            rating={review.rating}
            review={review.review}
          />
        ))}
      </InfiniteCarousel>
    </div>
  );
};

export default Reviews;
