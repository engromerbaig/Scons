import { useState, useMemo } from "react";

export const useProjectFilters = (projects) => {
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedTechnology, setSelectedTechnology] = useState("All Technologies");
  const [sortOrder, setSortOrder] = useState("desc");
  const [projectsToShow, setProjectsToShow] = useState(4);
  const projectsPerLoad = 2;

  // 🔄 Normalize service arrays and flatten for unique values
  const uniqueServices = useMemo(
    () => [
      "All Services",
      ...new Set(projects.flatMap((p) => (Array.isArray(p.service) ? p.service : [p.service]))),
    ],
    [projects]
  );

  const uniqueTechnologies = useMemo(
    () => ["All Technologies", ...new Set(projects.flatMap((p) => p.technologies))],
    [projects]
  );

  // 🔄 Compute valid services based on selected technology
  const validServices = useMemo(() => {
    if (selectedTechnology === "All Technologies") {
      return uniqueServices;
    }
    const relevantProjects = projects.filter((p) => p.technologies.includes(selectedTechnology));
    return [
      "All Services",
      ...new Set(relevantProjects.flatMap((p) => (Array.isArray(p.service) ? p.service : [p.service]))),
    ];
  }, [selectedTechnology, uniqueServices, projects]);

  // 🔄 Compute valid technologies based on selected service
  const validTechnologies = useMemo(() => {
    if (selectedService === "All Services") {
      return uniqueTechnologies;
    }
    const relevantProjects = projects.filter((p) =>
      (Array.isArray(p.service) ? p.service : [p.service]).includes(selectedService)
    );
    return ["All Technologies", ...new Set(relevantProjects.flatMap((p) => p.technologies))];
  }, [selectedService, uniqueTechnologies, projects]);

  const isServiceClickable = (service) => validServices.includes(service);
  const isTechnologyClickable = (technology) => validTechnologies.includes(technology);

  const handleServiceChange = (service) => {
    if (isServiceClickable(service)) {
      setSelectedService(service);
      setProjectsToShow(4);
      // Reset technology if it's not valid for the new service
      if (service !== "All Services" && !validTechnologies.includes(selectedTechnology)) {
        setSelectedTechnology("All Technologies");
      }
    }
  };

  const handleTechnologyChange = (technology) => {
    if (isTechnologyClickable(technology)) {
      setSelectedTechnology(technology);
      setProjectsToShow(4);
      // Reset service if it's not valid for the new technology
      if (technology !== "All Technologies" && !validServices.includes(selectedService)) {
        setSelectedService("All Services");
      }
    }
  };

  // 🔍 Filtering Logic
  const allFilteredProjects = projects
    .filter((p) => {
      const serviceArray = Array.isArray(p.service) ? p.service : [p.service];
      const matchesService = selectedService === "All Services" || serviceArray.includes(selectedService);
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
    validServices,
    validTechnologies,
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
    validServices,
    validTechnologies,
    isServiceClickable,
    isTechnologyClickable,
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