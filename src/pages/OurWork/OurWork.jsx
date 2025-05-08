import React, { useEffect } from "react";
import { theme } from "../../theme";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import projects from "./projectDetails";
import { useProjectFilters } from "../../hooks/useProjectFilters";
import Heading from "../../components/Heading/Heading";
import AnimatedArrow from "../../components/AnimatedArrow/AnimatedArrow";
import { FaUndo } from "react-icons/fa";
import InnerHero from "../../components/InnerHero/InnerHero";

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
    currentPage,
    projectsPerPage,
    totalProjects,
    paginate,
  } = useProjectFilters(projects);

  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className={`min-h-screen  `}>
      <InnerHero
        headingText="Our Success Stories"
        spanText="Success Stories"
        bodyText="A showcase of diverse projects that highlight our expertise in creating impactful, innovative tech solutions across industries."
      />


<div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center`}>
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
            className={`w-full md:w-[48%] mb-8 ${index % 2 === 1 ? "lg:mt-32" : ""}`}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pb-20">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
</div>
     
 
  );
};

export default OurWork;