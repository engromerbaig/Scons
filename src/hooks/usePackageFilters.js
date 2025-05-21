// src/hooks/usePackageFilters.js
import { useState } from "react";

const usePackageFilters = (initialPackages) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredPackages, setFilteredPackages] = useState(initialPackages);

  // Extract unique categories from packageData
  const uniqueCategories = [
    ...new Set(initialPackages.map((pkg) => pkg.category)),
  ].sort();

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "" || category === "All") {
      setFilteredPackages(initialPackages);
    } else {
      setFilteredPackages(
        initialPackages.filter((pkg) => pkg.category === category)
      );
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("");
    setFilteredPackages(initialPackages);
  };

  return {
    selectedCategory,
    filteredPackages,
    uniqueCategories,
    handleCategoryChange,
    resetFilters,
  };
};

export default usePackageFilters;