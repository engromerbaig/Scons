import { useState } from "react";

export const useProjectFilters = (projects) => {
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedTechnology, setSelectedTechnology] = useState("All Technologies");
  const [sortOrder, setSortOrder] = useState("desc");
  const [projectsToShow, setProjectsToShow] = useState(4);
  const projectsPerLoad = 2;

  // 🔄 Normalize service arrays and flatten for unique values
  const uniqueServices = [
    "All Services",
    ...new Set(projects.flatMap((p) => Array.isArray(p.service) ? p.service : [p.service]))
  ];

  const uniqueTechnologies = [
    "All Technologies",
    ...new Set(projects.flatMap((p) => p.technologies))
  ];

  const handleServiceChange = (service) => {
    setSelectedService(service);
    setProjectsToShow(4);
  };

  const handleTechnologyChange = (technology) => {
    setSelectedTechnology(technology);
    setProjectsToShow(2);
  };

  // 🔍 Filtering Logic Adjusted
  const allFilteredProjects = projects
    .filter((p) => {
      const serviceArray = Array.isArray(p.service) ? p.service : [p.service];
      const matchesService =
        selectedService === "All Services" || serviceArray.includes(selectedService);
      const matchesTech =
        selectedTechnology === "All Technologies" || p.technologies.includes(selectedTechnology);
      return matchesService && matchesTech;
    })
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return b.year !== a.year ? b.year - a.year : a.heading.localeCompare(b.heading);
      } else {
        return a.year !== b.year ? a.year - b.year : a.heading.localeCompare(b.heading);
      }
    });

  const filteredProjects = allFilteredProjects.slice(0, projectsToShow);

  console.log("useProjectFilters Debug:", {
    projectsToShow,
    totalProjects: allFilteredProjects.length,
    filteredProjectsLength: filteredProjects.length,
    showLoadMore: projectsToShow < allFilteredProjects.length,
    showShowLess: projectsToShow > 4,
  });

  const handleLoadMore = () => {
    setProjectsToShow((prev) => prev + projectsPerLoad);
  };

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
