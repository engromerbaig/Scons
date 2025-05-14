import React, { useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const HorizontalListView = ({
  children,
  gap = "0.5rem",
  className = "",
  perPage = 3,
  mobilePerPage = 2, // Re-added for compatibility with NestedTabs
}) => {
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
    <div className={`w-full ${className}`}>
      <style>
        {`
          .splide__track {
            overflow: hidden; /* Required for scrolling */
          }
          .splide__list {
            display: flex;
            flex-wrap: nowrap;
            width: 100%; /* Ensure list fills track */
          }
          .splide__slide {
            width: auto; /* Respect autoWidth */
            flex-shrink: 0; /* Prevent shrinking */
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .splide__slide > * {
            min-width: 120px; /* Match NestedTabs button min-width */
            width: 100%;
          }
        `}
      </style>
      <Splide
        options={{
          type: "slide",
          autoWidth: true, // Keep dynamic width per slide
          gap,
          pagination: false,
          arrows: false,
          drag: true, // Changed from "free" to true for standard drag behavior
          snap: true, // Re-enable snap for better UX (smooth stopping points)
          wheel: false, // Keep wheel disabled to avoid vertical scroll issues
          perPage, // Added for compatibility
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
          <SplideSlide key={idx}>
            {child}
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default HorizontalListView;