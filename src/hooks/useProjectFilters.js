import { useState } from "react";

export const useProjectFilters = (projects) => {
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedTechnology, setSelectedTechnology] = useState("All Technologies");
  const [sortOrder, setSortOrder] = useState("desc");
  const [projectsToShow, setProjectsToShow] = useState(4); // Initial number of projects to show
  const projectsPerLoad = 2; // Number of projects to load each time; adjust this value to change the load increment

  // Get unique services and technologies
  const uniqueServices = ["All Services", ...new Set(projects.map((p) => p.service))];
  const uniqueTechnologies = ["All Technologies", ...new Set(projects.flatMap((p) => p.technologies))];

  // Handle service or technology change
  const handleServiceChange = (service) => {
    setSelectedService(service);
    setProjectsToShow(4); // Reset to initial number of projects
  };

  const handleTechnologyChange = (technology) => {
    setSelectedTechnology(technology);
    setProjectsToShow(2); // Reset to initial number of projects
  };

  // Filter and sort logic
  const allFilteredProjects = projects
    .filter(
      (p) =>
        (selectedService === "All Services" || p.service === selectedService) &&
        (selectedTechnology === "All Technologies" || p.technologies.includes(selectedTechnology))
    )
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return b.year !== a.year ? b.year - a.year : a.heading.localeCompare(b.heading);
      } else {
        return a.year !== b.year ? a.year - b.year : a.heading.localeCompare(b.heading);
      }
    });

  // Slice for display
  const filteredProjects = allFilteredProjects.slice(0, projectsToShow);

  // Debug filter and load more state
  console.log("useProjectFilters Debug:", {
    projectsToShow,
    totalProjects: allFilteredProjects.length,
    filteredProjectsLength: filteredProjects.length,
    showLoadMore: projectsToShow < allFilteredProjects.length,
    showShowLess: projectsToShow > 4,
  });

  // Load More logic
  const handleLoadMore = () => {
    setProjectsToShow((prev) => prev + projectsPerLoad);
  };

  // Show Less logic
  const handleShowLess = () => {
    setProjectsToShow((prev) => Math.max(4, prev - projectsPerLoad));
  };

  const resetFilters = () => {
    setSelectedService("All Services");
    setSelectedTechnology("All Technologies");
    setSortOrder("desc");
    setProjectsToShow(4);
  };

  return {
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
    totalProjects: allFilteredProjects.length,
    showLoadMore: projectsToShow < allFilteredProjects.length,
    showShowLess: projectsToShow > 4,
    handleLoadMore,
    handleShowLess,
  };
};