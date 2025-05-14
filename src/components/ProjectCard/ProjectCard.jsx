import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ScrollToTopLink from "../../utilities/ScrollToTopLink";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";

const ProjectCard = ({ project }) => {
  const imageRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);

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
      <div className="flex flex-col items-start ">
        <div className="relative w-full h-[600px] overflow-hidden rounded-3xl mb-4">
          <img
            ref={imageRef}
            src={project.coverImage} // Image 2 as cover
            alt={project.heading}
            className="w-full h-[115%] object-cover absolute top-0 left-0"
          />
        </div>
        <img src={project.logo} className="w-1/5 mb-4" alt={`${project.heading} logo`} />
        <Heading
          text={project.heading}
          size="text-35px"
          fontWeight="font-semibold"
          centered={false}
          className="group-hover:underline"
        />
        <BodyText text={project.headline} size="text-25px" centered={false} lineHeight="leading-loose" />
      </div>
    </Link>
  );
};

export default ProjectCard;