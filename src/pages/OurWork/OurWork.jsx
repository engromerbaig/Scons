import React, { useEffect, useRef, useState } from "react";
import { theme } from "../../theme";
import projects from "./projectDetails";
import { useProjectFilters } from "../../hooks/useProjectFilters";
import InnerHero from "../../components/InnerHero/InnerHero";
import FilterControls from "./FilterControls";
import ProjectGrid from "./ProjectGrid";
import LoadMoreControls from "./LoadMoreControls";

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
        <FilterControls
          selectedService={selectedService}
          selectedTechnology={selectedTechnology}
          sortOrder={sortOrder}
          uniqueServices={uniqueServices}
          uniqueTechnologies={uniqueTechnologies}
          handleServiceChange={handleServiceChange}
          handleTechnologyChange={handleTechnologyChange}
          setSortOrder={setSortOrder}
          resetFilters={resetFilters}
        />

        <ProjectGrid filteredProjects={filteredProjects} />

        <LoadMoreControls
          showLoadMore={showLoadMore}
          showShowLess={showShowLess}
          handleLoadMore={() => {
            setLastAction("loadMore");
            handleLoadMore();
          }}
          handleShowLess={() => {
            setLastAction("showLess");
            handleShowLess();
          }}
          buttonContainerRef={buttonContainerRef}
        />
      </div>
    </div>
  );
};

export default OurWork;