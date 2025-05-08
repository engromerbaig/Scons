import React, { useEffect, useRef, useState } from "react";
import { theme } from "../../theme";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import projects from "./projectDetails";
import { useProjectFilters } from "../../hooks/useProjectFilters";
import InnerHero from "../../components/InnerHero/InnerHero";
import { FaUndo } from "react-icons/fa";
import Button from "../../components/Button/Button";

const OurWork = () => {
  const {
    selectedService,
    selectedTechnology,
    sortOrder,
    filteredProjects,
    uniqueServices,
    uniqueTechnologies,
    handleServiceChange,
    handleTechnologyChange,
    setSortOrder,
    resetFilters,
    projectsToShow,
    totalProjects,
    showLoadMore,
    showShowLess,
    handleLoadMore,
    handleShowLess,
  } = useProjectFilters(projects);

  const containerRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const [lastAction, setLastAction] = useState(null); // Track last action ("loadMore" or "showLess")

  // Handle scrolling to position buttons at the bottom of the viewport
  useEffect(() => {
    if ((projectsToShow > 4 || lastAction === "showLess") && buttonContainerRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const buttonRect = buttonContainerRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollY = window.scrollY || window.pageYOffset;
          const buttonBottom = buttonRect.top + buttonRect.height + scrollY;

          // Scroll so the button container's bottom is at the viewport's bottom
          window.scrollTo({
            top: buttonBottom - viewportHeight + 20, // Small offset for padding
            behavior: "smooth",
          });
        });
      });
    }
  }, [projectsToShow, lastAction]);

  // Debug button visibility and scroll
  console.log("OurWork Debug:", {
    projectsToShow,
    totalProjects,
    showLoadMore,
    showShowLess,
    filteredProjectsLength: filteredProjects.length,
    lastAction,
  });

  return (
    <div className={`min-h-screen`}>
      <InnerHero
        headingText="Our Success Stories"
        spanText="Success Stories"
        bodyText="A showcase of diverse projects that highlight our expertise in creating impactful, innovative tech solutions across industries."
      />

      <div
        ref={containerRef}
        className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center`}
      >
        <div className="flex flex-col items-start gap-4 mt-8">
          {/* Service Tabs */}
          <div className="flex flex-wrap gap-4">
            {uniqueServices.map((service) => (
              <button
                key={service}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedService === service ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleServiceChange(service)}
              >
                {service}
              </button>
            ))}
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <select
              className="px-4 py-2 border rounded-md text-sm"
              value={selectedTechnology}
              onChange={(e) => handleTechnologyChange(e.target.value)}
            >
              {uniqueTechnologies.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>

            <button
              className="px-4 py-2 border rounded-md text-sm flex items-center gap-2"
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            >
              {sortOrder === "desc" ? "Oldest" : "Latest"}
            </button>

            <button
              className="px-4 py-2 border rounded-md text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors"
              onClick={resetFilters}
            >
              <FaUndo />
            </button>
          </div>
        </div>

        {/* Cards container: 2 cards per row */}
        <div className="flex flex-wrap justify-between w-full py-20">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`w-full md:w-[48%] mb-8 ${index % 2 === 1 ? "lg:mt-32" : ""} transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Load More/Show Less Controls */}
        {(showLoadMore || showShowLess) && (
          <div
            ref={buttonContainerRef}
            className="flex flex-col md:flex-row gap-4 items-center justify-center pb-20"
          >
            {showLoadMore && (
              <Button
                name="Load More"
                bgColor="bg-black"
                textColor="white"
                className="px-4 py-2"
                fontSize="text-sm"
                onClick={() => {
                  setLastAction("loadMore");
                  handleLoadMore();
                }}
              />
            )}
            {showShowLess && (
              <Button
                name="Show Less"
                bgColor="bg-black"
                textColor="white"
                className="px-4 py-2"
                fontSize="text-sm"
                onClick={() => {
                  setLastAction("showLess");
                  handleShowLess();
                }}
              />
            )}
          </div>
        )}
      </div>

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

export default OurWork;