import React, { useEffect, useMemo, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { CgArrowLongRight } from "react-icons/cg";

const HorizontalListView = ({
  children,
  gap = "0.5rem",
  className = "",
  perPage = 3,
  mobilePerPage = 2,
  uniqueId, // Optional unique ID for scoping styles
  showArrow = true, // New prop to control arrow visibility, defaults to true
}) => {
  // Generate a random ID if not provided
  const carouselId = useMemo(() => uniqueId || `horizontal-carousel-${Math.random().toString(36).substring(2, 10)}`, [uniqueId]);
  
  // Create a ref to control the Splide instance
  const splideRef = useRef(null);

  useEffect(() => {
    const logOptions = () => {
      console.log(`HorizontalListView perPage: ${perPage}, mobilePerPage: ${mobilePerPage}`);
      console.log(`Viewport width: ${window.innerWidth}px`);
    };
    logOptions();
    window.addEventListener("resize", logOptions);
    return () => window.removeEventListener("resize", logOptions);
  }, [perPage, mobilePerPage]);

  // Function to move carousel to the right
  const handleNext = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("+1"); // Move to the next slide
    }
  };

  return (
    <div className={`w-full ${carouselId} ${className}`}>
      <style>
        {`
          .${carouselId} .splide__track {
            overflow: hidden;
          }
          .${carouselId} .splide__list {
            display: flex;
            flex-wrap: nowrap;
            width: 100%;
          }
          .${carouselId} .splide__slide {
            width: auto;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .${carouselId} .splide__slide > * {
            min-width: 120px;
            width: 100%;
          }
          .${carouselId} .carousel-arrow {
            position: absolute;
            top: -2.5rem;
            right: 0;
            cursor: pointer;
            z-index: 10;
            font-size: 1.5rem;
            transition: color 0.2s;
          }
          .${carouselId} .carousel-arrow:hover {
            color: #000;
          }
        `}
      </style>
      <div className="relative">
        {showArrow && (
          <CgArrowLongRight
            className="carousel-arrow text-neon"
            onClick={handleNext}
            aria-label="Next slide"
          />
        )}
        <Splide
          ref={splideRef}
          options={{
            type: "slide",
            autoWidth: true,
            gap,
            pagination: false,
            arrows: false,
            drag: true,
            snap: true,
            wheel: false,
            perPage,
            perMove: 1,
            breakpoints: {
              1024: {
                perPage: mobilePerPage,
                autoWidth: true,
              },
              768: {
                perPage: Math.min(mobilePerPage, perPage),
              },
              640: {
                perPage: 1,
              },
            },
          }}
          aria-label="Horizontal List View"
          className="w-full"
        >
          {React.Children.map(children, (child, idx) => (
            <SplideSlide key={idx}>{child}</SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default HorizontalListView;