import React, { useMemo, useState, useEffect } from "react";
import Heading from "../Heading/Heading";
import { theme } from "../../theme";
import projects from "../../pages/OurWork/projectDetails";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";
import ProjectGrid from "../../pages/OurWork/ProjectGrid";
import ChatModal from "../ChatModal/ChatModal";
import mysteryImage from "../../assets/icons/mystery.svg";

// Mystery project configuration
const mysteryProject = {
  coverImage: mysteryImage,
  heading: "Start Your Own Project",
  headline: "Next in line could be your project — let's start building it today!",
  isMystery: true, // Flag to identify mystery project
};

// Function to select random unique projects
const getRandomProjects = (projects, count = 4, showMystery = false) => {
  const shuffled = [...projects];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const selectedProjects = shuffled.slice(0, Math.min(count, projects.length));
  // Replace the 4th project with mystery project if showMystery is true
  if (showMystery && selectedProjects.length >= 4) {
    selectedProjects[3] = mysteryProject;
  }
  return selectedProjects;
};

const Projects = ({
  heading = "Real Projects, Real Impact",
  spanText = "Projects",
  spanColor = "text-neon",
  centered = false,
  showUnderline = true,
  arrowText = "More Projects",
  arrowLink = "/portfolio",
  filteredProjects = null,
  enableAnimation = true,
  containerClassName = "",
  showMystery = false,
}) => {
  // State to control chat modal visibility
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Debug state changes
  useEffect(() => {
    console.log("isChatModalOpen changed:", isChatModalOpen);
  }, [isChatModalOpen]);

  // Use provided filteredProjects or generate random projects
  const randomProjects = useMemo(
    () => filteredProjects || getRandomProjects(projects, 4, showMystery),
    [filteredProjects, showMystery]
  );

  // Debug modal trigger
  const handleMysteryClick = () => {
    console.log("handleMysteryClick called, setting isChatModalOpen to true");
    setIsChatModalOpen(true);
  };

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
          className="text-left self-auto xl:self-auto"
        />
      </div>
      <ProjectGrid
        filteredProjects={randomProjects}
        enableAnimation={enableAnimation}
        containerClassName={containerClassName}
        onMysteryClick={handleMysteryClick} // Pass explicit handler
      />
      {/* Render ChatModal with props matching Button.jsx */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => {
          console.log("Closing ChatModal");
          setIsChatModalOpen(false);
        }}
      />
    </div>
  );
};

export default Projects;