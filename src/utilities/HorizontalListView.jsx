import React, { useEffect, useMemo, useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const HorizontalListView = ({
  children,
  gap = "0.5rem",
  className = "",
  perPage = 3,
  mobilePerPage = 2,
  uniqueId, // Optional unique ID for scoping styles
  showIndicators = false, // New prop, default false
}) => {
  const carouselId = useMemo(
    () => uniqueId || `horizontal-carousel-${Math.random().toString(36).substring(2, 10)}`,
    [uniqueId]
  );

  const splideRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = React.Children.count(children);

  useEffect(() => {
    const splide = splideRef.current?.splide;

    if (splide && showIndicators) {
      // Sync active index for custom indicators
      const onMove = (newIndex) => {
        setActiveIndex(newIndex);
      };
      splide.on("move", onMove);
      return () => splide.off("move", onMove);
    }
  }, [showIndicators]);

  const goToSlide = (index) => {
    splideRef.current?.splide.go(index);
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
          /* Optional: style for custom indicators */
          .${carouselId} .custom-indicators {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 1rem;
          }
          .${carouselId} .custom-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ccc;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .${carouselId} .custom-indicator.active {
            background: #00c5ff;
          }
        `}
      </style>

      <Splide
        ref={splideRef}
        options={{
          type: "slide",
          autoWidth: true,
          gap,
          pagination: false, // disable default pagination
          arrows: false, // no arrows
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

      {showIndicators && (
        <div className="custom-indicators">
          {[...Array(totalSlides)].map((_, idx) => (
            <div
              key={idx}
              className={`custom-indicator ${idx === activeIndex ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goToSlide(idx);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HorizontalListView;
