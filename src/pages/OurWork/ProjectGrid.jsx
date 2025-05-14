import React from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const ProjectGrid = ({ filteredProjects }) => {
  return (
    <div className="flex flex-wrap justify-between w-full py-20">
      {filteredProjects.map((project, index) => (
        <div
          key={project.id}
          className={`w-full md:w-[40%] mb-8 ${index % 2 === 1 ? "lg:mt-32" : ""} transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
      {/* Inline CSS for fade-in animation */}
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
    </div>
  );
};

export default ProjectGrid;