import React, { useMemo } from "react";
import Heading from "../Heading/Heading";
import { theme } from "../../theme";
import projects from "../../pages/OurWork/projectDetails";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";
import ProjectGrid from "../../pages/OurWork/ProjectGrid";

// Function to select random unique projects
const getRandomProjects = (projects, count = 4) => {
  const shuffled = [...projects];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, projects.length));
};

const Projects = ({
  heading = "A Portfolio of Our Success",
  spanText = "Success",
  spanColor = "text-neon",
  centered = false,
  showUnderline = true,
  arrowText = "More Projects",
  arrowLink = "/portfolio",
  filteredProjects = null, // Allow passing specific projects
  enableAnimation = true,
  containerClassName = "",
}) => {
  // Use provided filteredProjects or generate random projects
  const randomProjects = useMemo(
    () => filteredProjects || getRandomProjects(projects, 4),
    [filteredProjects]
  );

  return (
    <div
      id="projects"
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center`}
    >
     <div className="flex flex-col xl:flex-row xl:justify-between justify-start items-start xl:items-center w-full gap-y-4 mb-12 xl:mb-20">
  <Heading
    text={heading}
    spanText={spanText}
    centered={centered}
    spanColor={spanColor}
    className="text-left"
    showUnderline={showUnderline}
  />
  <AnimatedArrow
    text={arrowText}
    to={arrowLink}
    className="text-left self-auto xl:self-auto" // Right-align text and push to right on mobile
  />
</div>
      <ProjectGrid
        filteredProjects={randomProjects}
        enableAnimation={enableAnimation}
        containerClassName={containerClassName}
      />
    </div>
  );
};

export default Projects;