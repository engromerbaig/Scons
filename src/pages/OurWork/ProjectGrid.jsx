import React from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const ProjectGrid = ({ filteredProjects, enableAnimation = true, containerClassName = "py-20", cardOffset = "lg:mt-40" }) => {
  return (
    <div className={`flex flex-wrap justify-between gap-10 xl:gap-2 w-full ${containerClassName}`}>
      {filteredProjects.map((project, index) => (
        <div
          key={project.id}
          className={`w-full md:w-[43%] mb-8 ${index % 2 === 1 ? cardOffset : ""} ${
            enableAnimation ? "transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn" : ""
          }`}
          style={enableAnimation ? { animationDelay: `${index * 100}ms` } : {}}
        >
          <ProjectCard project={project} />
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