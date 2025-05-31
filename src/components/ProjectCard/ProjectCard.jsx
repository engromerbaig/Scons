import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import SkeletonLoader from "../../utilities/SkeletonLoader";
import { HiArrowLongRight } from "react-icons/hi2";

const ProjectCard = ({ project, onMysteryClick }) => {
  const imageRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;

        lastScrollY.current = currentScrollY;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          let translateY = -100 * scrollProgress;

          if (isScrollingDown) {
            translateY = Math.max(translateY, -100);
          } else {
            translateY = Math.min(0, translateY + 30);
          }

          imageRef.current.style.transform = `translateY(${translateY}px)`;
          imageRef.current.style.transition = 'transform 0.15s ease-out';
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click for mystery project
  const handleClick = (e) => {
    if (project.isMystery && onMysteryClick) {
      e.preventDefault(); // Prevent Link navigation
      e.stopPropagation(); // Prevent any parent handlers
      console.log("Mystery project clicked, triggering modal");
      onMysteryClick(); // Trigger modal
    }
  };

  // Conditionally render Link for non-mystery projects, div for mystery project
  const CardWrapper = project.isMystery ? "div" : Link;

  return (
    <CardWrapper
      to={project.isMystery ? undefined : `/portfolio/${project.slug}`}
      className="group"
      onClick={project.isMystery ? handleClick : undefined}
    >
      <div className="flex flex-col items-start  w-full">
        {/* Cover Image */}
        <div className="relative w-full h-[500px] xl:h-[600px] 2xl:h-[700px] overflow-hidden rounded-3xl mb-2 group">
          {!imageLoaded && (
            <SkeletonLoader
              className="w-full h-full absolute top-0 left-0"
              rounded="rounded-3xl"
            />
          )}
          <img
            ref={imageRef}
            src={project.coverImage}
            alt={project.heading}
            className={`w-full h-[115%] object-cover absolute top-0 left-0 transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Sliding Overlay */}
          <div className="absolute inset-0 bg-black/60 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out rounded-3xl z-10" />

          {/* Sliding Text Bottom-Right */}
          <div className="absolute bottom-4 right-2 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out delay-200 opacity-0 group-hover:opacity-100 z-20">
            <div className="flex gap-2">
              <BodyText
                text={
                  <>
                    {project.isMystery ? "Start Your Project" : `View ${project.heading}`}{" "}
                    <br />
                    Details
                  </>
                }
                color="text-white"
                size="text-sm"
                fontWeight="font-semibold"
                className="max-w-[200px] text-right"
                centered={false}
              />
              <HiArrowLongRight className="text-neon text-xl" />
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="relative w-1/5 h-10 mb-4">
          {project.logo ? (
            <img
              src={project.logo}
              className="w-full h-full object-contain transition-opacity duration-500 opacity-100"
              alt={`${project.heading} logo`}
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        <Heading
          text={project.heading}
          size="text-35px"
          fontWeight={project.isMystery ? "font-black" : "font-semibold"}
          centered={false}
          className="group-hover:underline"
        />
        <BodyText
          text={project.headline}
          size="text-25px"
          centered={false}
          lineHeight="leading-loose"
        />
      </div>
    </CardWrapper>
  );
};

export default ProjectCard;