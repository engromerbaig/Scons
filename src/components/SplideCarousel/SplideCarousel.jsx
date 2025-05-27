import React, { useEffect, useMemo, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import SkeletonLoader from "../../utilities/SkeletonLoader";

const SplideCarousel = ({
  images = [],
  direction = "ltr",
  speed = 1,
  perPage = 2, // Default for desktop
  mobilePerPage = 1, // Default for mobile
  height = "400px",
  gap = "1rem",
  pauseOnHover = false,
  className = "",
  haveBorder = true, // Controls whether border is applied
  objectFit = "cover",
  imageRound = "rounded-none",
  imageSize = "w-full h-full",
  showLoader = true, // Controls whether loader mechanism is used
  haveBgBlurred = false, // Controls whether blurred background is applied
}) => {
  const uniqueId = useMemo(
    () => `splide-carousel-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  useEffect(() => {
    const logOptions = () => {
      const width = window.innerWidth;
      let activePerPage = width <= 768 ? mobilePerPage : perPage;
      console.log(`Viewport width: ${width}px`);
      console.log(`Active perPage: ${activePerPage}`);
    };
    logOptions();
    window.addEventListener("resize", logOptions);
    return () => window.removeEventListener("resize", logOptions);
  }, [perPage, mobilePerPage]);

  return (
    <div className={`pb-10 xl:pb-20 ${className} ${uniqueId}`}>
      <style>
        {`
          .${uniqueId} .splide__track {
            overflow: visible;
          }
          .${uniqueId} .splide__slide {
            height: ${height};
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .${uniqueId} .image-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden; /* Ensure blurred background stays within container */
            ${haveBorder ? `border: 4px solid #26292D; border-radius: inherit;` : ""}
          }
          .${uniqueId} .skeleton-loader {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
          }
          .${uniqueId} .splide__slide img {
            width: 100%;
            height: 100%;
            object-fit: ${objectFit};
            z-index: 2; /* Ensure main image is above blurred background */
            position: relative;
          }
          .${uniqueId} .blurred-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            filter: blur(2px); /* Adjust blur intensity as needed */
            z-index: 1; /* Below the main image */
            opacity: 0.9; /* Optional: Adjust opacity for better effect */
            ${haveBorder ? `border-radius: inherit;` : ""}
          }
          @media (max-width: 768px) {
            .${uniqueId} .splide__slide {
              height: ${height};
            }
          }
        `}
      </style>
      <Splide
        options={{
          type: "loop",
          perPage: perPage,
          perMove: 1,
          arrows: false,
          pagination: false,
          gap: gap,
          direction: direction,
          autoScroll: {
            speed: speed,
            pauseOnHover: pauseOnHover,
            autoStart: true,
          },
          autoWidth: false,
          height: height,
          breakpoints: {
            768: {
              perPage: mobilePerPage,
              gap: "1rem", // Adjusted gap for mobile
            },
          },
          focus: "center",
        }}
        extensions={{ AutoScroll }}
        aria-label="Project Images Carousel"
      >
        {images.map((image, index) => {
          const [isLoaded, setIsLoaded] = useState(false);

          return (
            <SplideSlide key={index}>
              <div className={`image-container ${imageRound}`}>
                {showLoader && !isLoaded && (
                  <SkeletonLoader
                    className={`skeleton-loader ${imageSize} ${imageRound}`}
                    rounded={imageRound}
                  />
                )}
                {haveBgBlurred && objectFit === "contain" && (
                  <div
                    className="blurred-background"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                )}
                <img
                  src={image}
                  alt={`Carousel image ${index + 1}`}
                  className={`${imageSize} ${imageRound}`}
                  style={{ objectFit }}
                  loading="lazy"
                  onLoad={() => setIsLoaded(true)}
                />
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default SplideCarousel;