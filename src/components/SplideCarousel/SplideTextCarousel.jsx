import React, { useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Heading from "../Heading/Heading";
import "@splidejs/react-splide/css";

const SplideTextCarousel = ({
  items = [],
  renderItem,
  speed = 1,
  pauseOnHover = false,
  showBullets = true,
  height = "100px",
  gap = "2rem",
  textSize = "text-70px",
  className = "",
}) => {
  useEffect(() => {
    const logOptions = () => {
      console.log(`SplideTextCarousel item count: ${items.length}`);
      console.log(`Viewport width: ${window.innerWidth}px`);
    };
    logOptions();
    window.addEventListener("resize", logOptions);
    return () => window.removeEventListener("resize", logOptions);
  }, [items.length]);

  return (
    <div className={` ${className}`}>
      <Splide
        options={{
          type: "loop",
          perPage: 2,
          perMove: 1,
          arrows: false,
          pagination: false,
          gap,
          direction: "ltr",
          autoScroll: {
            speed,
            pauseOnHover,
            autoStart: true,
          },
          height,
          breakpoints: {
            640: {
              perPage: 1,
              gap: "1rem",
            },
            768: {
              perPage: 1,
            },
            1024: {
              perPage: 3,
            },
          },
        }}
        extensions={{ AutoScroll }}
        aria-label="Text Carousel"
      >
        {items.map((item, index) => (
          <SplideSlide key={index}>
            <div className="flex items-center justify-center h-full">
              {renderItem ? (
                <>
                  {renderItem(item, index)}
                  {showBullets && (
                    <span className="mx-4 font-black text-4xl text-neon select-none">
                      •
                    </span>
                  )}
                </>
              ) : (
                <>
                  <Heading
                    text={item}
                    color="text-neon"
                    spanColor="text-neon"
                    fontWeight="font-black"
                    size={textSize}
                    className="whitespace-nowrap"
                  />
                  {showBullets && (
                    <span className="mx-4 font-black text-4xl text-neon select-none">
                      •
                    </span>
                  )}
                </>
              )}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SplideTextCarousel;