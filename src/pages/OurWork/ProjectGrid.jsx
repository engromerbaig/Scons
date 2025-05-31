import React from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const ProjectGrid = ({ filteredProjects, enableAnimation = true, containerClassName = "py-20", cardOffset = "lg:mt-40", onMysteryClick }) => {
  return (
    <div
      className={`flex flex-wrap justify-center gap-20 xl:gap-0 xl:grid xl:grid-cols-2 xl:gap-x-60  2xl:gap-x-[400px] xl:justify-between w-full ${containerClassName}`}
    >
      {filteredProjects.map((project, index) => (
        <div
          key={project.id || `project-${index}`} // Fallback key if project.id is undefined
          className={`w-full max-w-md xl:max-w-none xl:w-full mb-8 ${index % 2 === 1 ? cardOffset : ""} ${
            enableAnimation ? "transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn" : ""
          }`}
          style={enableAnimation ? { animationDelay: `${index * 100}ms` } : {}}
        >
          <ProjectCard project={project} onMysteryClick={onMysteryClick} />
        </div>
      ))}
      {/* Inline CSS for fade-in animation, included only if animation is enabled */}
      {enableAnimation && (
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out forwards;
          }
        `}</style>
      )}
    </div>
  );
};

export default ProjectGrid;