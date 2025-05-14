import React, { useEffect, useMemo } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const HorizontalListView = ({
  children,
  gap = "0.5rem",
  className = "",
  perPage = 3,
  mobilePerPage = 2,
  uniqueId, // Optional unique ID for scoping styles
}) => {
  // Generate a random ID if not provided
  const carouselId = useMemo(() => uniqueId || `horizontal-carousel-${Math.random().toString(36).substring(2, 10)}`, [uniqueId]);

  useEffect(() => {
    const logOptions = () => {
      console.log(`HorizontalListView perPage: ${perPage}, mobilePerPage: ${mobilePerPage}`);
      console.log(`Viewport width: ${window.innerWidth}px`);
    };
    logOptions();
    window.addEventListener("resize", logOptions);
    return () => window.removeEventListener("resize", logOptions);
  }, [perPage, mobilePerPage]);

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
        `}
      </style>
      <Splide
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
  );
};

export default HorizontalListView;
