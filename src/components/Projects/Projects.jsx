import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import ProjectCard from "../ProjectCard/ProjectCard";
import projects from "../../pages/OurWork/projectDetails"
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";

const Projects = () => {
  return (
    <div
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center min-h-screen`}
    >
      <div className="flex flex-row justify-between items-center w-full mb-8">
        <Heading text="Our Success Stories" className="text-left" />
        <AnimatedArrow
          text="More Case Studies"
        />
      </div>

      {/* Cards container: 2 cards per row */}
      <div className="flex flex-wrap justify-between w-full ">
        {projects.map(({ id, image, logo, heading, bodyText }, index) => (
          <div
            key={id}
            className={`w-full md:w-[48%] mb-8 ${
              index % 2 === 1 ? "lg:mt-40" : "" /* Add margin-top to right cards */
            }`}
          >
            <ProjectCard
              image={image}
              logo={logo}
              heading={heading}
              bodyText={bodyText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
