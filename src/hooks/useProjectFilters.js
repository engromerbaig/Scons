// useProjectFilters.js
import { useState } from "react";

export const useProjectFilters = (projects) => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedClient, setSelectedClient] = useState("Select Client");
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const projectsPerPage = 9; // Number of projects per page

  // Get unique clients and years
  const uniqueClients = ["Select Client", ...new Set(projects.map((p) => p.client))];
  const uniqueYears = ["Select Year", ...new Set(projects.map((p) => p.year).sort((a, b) => b - a))];

  // Get clients for the selected category
  const getClientsForCategory = (category) => {
    if (category === "All") return uniqueClients;
    return ["Select Client", ...new Set(projects.filter((p) => p.type === category).map((p) => p.client))];
  };

  // Get years for the selected client and category
  const getYearsForClientAndCategory = (client, category) => {
    if (client === "Select Client" && category === "All") return uniqueYears;
    let filteredProjects = projects;
    if (category !== "All") filteredProjects = filteredProjects.filter((p) => p.type === category);
    if (client !== "Select Client") filteredProjects = filteredProjects.filter((p) => p.client === client);
    return ["Select Year", ...new Set(filteredProjects.map((p) => p.year).sort((a, b) => b - a))];
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    const applicableClients = getClientsForCategory(category);
    const applicableYears = getYearsForClientAndCategory(selectedClient, category);

    if (!applicableClients.includes(selectedClient)) {
      setSelectedClient("Select Client");
    }
    if (!applicableYears.includes(selectedYear)) {
      setSelectedYear("Select Year");
    }
    setActiveTab(category);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  // Filter projects based on active filters
  const filteredProjects = projects
    .filter((p) => 
      (activeTab === "All" || p.type === activeTab) &&
      (selectedClient === "Select Client" || p.client === selectedClient) &&
      (selectedYear === "Select Year" || p.year === selectedYear)
    )
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return b.year !== a.year ? b.year - a.year : a.name.localeCompare(b.name);
      } else {
        return a.year !== b.year ? a.year - b.year : a.name.localeCompare(b.name);
      }
    });

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Get applicable categories based on selected client and year
  const applicableCategories = ["All", ...new Set(
    projects
      .filter((p) => 
        (selectedClient === "Select Client" || p.client === selectedClient) &&
        (selectedYear === "Select Year" || p.year === selectedYear)
      )
      .map((p) => p.type)
  )];

  // Reset all filters
  const resetFilters = () => {
    setActiveTab("All");
    setSelectedClient("Select Client");
    setSelectedYear("Select Year");
    setSortOrder("desc");
    setCurrentPage(1); // Reset to the first page
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return {
    activeTab,
    selectedClient,
    selectedYear,
    sortOrder,
    filteredProjects: currentProjects, // Return only the projects for the current page
    applicableCategories,
    getClientsForCategory,
    getYearsForClientAndCategory,
    handleCategoryChange,
    setSelectedClient,
    setSelectedYear,
    setSortOrder,
    resetFilters,
    currentPage,
    projectsPerPage,
    totalProjects: filteredProjects.length, // Total number of filtered projects
    paginate,
  };
};