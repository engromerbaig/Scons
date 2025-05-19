import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import SkeletonLoader from "../../utilities/SkeletonLoader";

const ProjectCard = ({ project }) => {
  const imageRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

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

  return (
    <Link to={`/portfolio/${project.slug}`} className="group">
      <div className="flex flex-col items-start">
        {/* Cover Image */}
        <div className="relative w-full h-[500px] overflow-hidden rounded-3xl mb-2">
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
        </div>

        {/* Logo */}
        <div className="relative w-1/5 h-10 mb-4">
          {!logoLoaded && (
            <SkeletonLoader
              className="w-full h-full absolute top-0 left-0"
              rounded="rounded-lg"
            />
          )}
          <img
            src={project.logo}
            className={`w-full h-full object-contain transition-opacity duration-500 ${
              logoLoaded ? "opacity-100" : "opacity-0"
            }`}
            alt={`${project.heading} logo`}
            onLoad={() => setLogoLoaded(true)}
          />
        </div>

        <Heading
          text={project.heading}
          size="text-35px"
          fontWeight="font-semibold"
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
    </Link>
  );
};

export default ProjectCard;
