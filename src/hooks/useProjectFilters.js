import { useState } from "react";

export const useProjectFilters = (projects) => {
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedTechnology, setSelectedTechnology] = useState("All Technologies");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  // Get unique services and technologies
  const uniqueServices = ["All Services", ...new Set(projects.map(p => p.service))];
  const uniqueTechnologies = ["All Technologies", ...new Set(projects.flatMap(p => p.technologies))];

  // Handle service or technology change
  const handleServiceChange = (service) => {
    setSelectedService(service);
    setCurrentPage(1); // Reset to first page
  };

  const handleTechnologyChange = (technology) => {
    setSelectedTechnology(technology);
    setCurrentPage(1); // Reset to first page
  };

  // Filter logic
  const filteredProjects = projects
    .filter(p =>
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

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const resetFilters = () => {
    setSelectedService("All Services");
    setSelectedTechnology("All Technologies");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return {
    selectedService,
    selectedTechnology,
    sortOrder,
    filteredProjects: currentProjects,
    uniqueServices,
    uniqueTechnologies,
    handleServiceChange,
    handleTechnologyChange,
    setSortOrder,
    resetFilters,
    currentPage,
    projectsPerPage,
    totalProjects: filteredProjects.length,
    paginate,
  };
};