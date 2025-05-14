import React from "react";
import Heading from "../Heading/Heading";
import { theme } from "../../theme";
import projects from "../../pages/OurWork/projectDetails";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";
import ProjectGrid from "../../pages/OurWork/ProjectGrid";

// Function to select 4 random unique projects
const getRandomProjects = (projects, count = 4) => {
  // Shuffle array using Fisher-Yates algorithm
  const shuffled = [...projects];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Return first 'count' projects
  return shuffled.slice(0, Math.min(count, projects.length));
};

const Projects = () => {
  // Select 4 random projects
  const randomProjects = getRandomProjects(projects, 4);

  return (
    <div
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center`}
    >
      <div className="flex flex-col xl:flex-row xl:justify-between justify-start item-start xl:items-center w-full mb-8">
        <Heading text="A Portfolio of Our Success" spanText="Success" centered={false} spanColor="text-neon" className="text-left" />
        <AnimatedArrow text="More Case Studies" to="/portfolio" />
      </div>
      <ProjectGrid
        filteredProjects={randomProjects}
        enableAnimation={true}
        containerClassName=""
      />
    </div>
  );
};

export default Projects;