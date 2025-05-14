import React from "react";
import Heading from "../Heading/Heading";
import { theme } from "../../theme";
import ProjectCard from "../ProjectCard/ProjectCard";
import projects from "../../pages/OurWork/projectDetails";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";

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
      <div className="flex flex-row justify-between items-center w-full mb-8">
        <Heading text="A Portfolio of Our Success"  spanText="Success" spanColor="text-neon" className="text-left" />
        <AnimatedArrow text="More Case Studies" to="/portfolio" />
      </div>

      {/* Cards container: 2 cards per row */}
      <div className="flex flex-wrap justify-between w-full">
        {randomProjects.map((project, index) => (
          <div
            key={project.id}
            className={`w-full md:w-[48%] mb-8 ${index % 2 === 1 ? "lg:mt-28" : ""}`}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;