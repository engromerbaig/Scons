import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import ogDefault from '../../assets/images/og-default.jpg'; // Default OG image
import { theme } from '../../theme';
import projects from './projectDetails';
import { useProjectFilters } from '../../hooks/useProjectFilters';
import InnerHero from '../../components/InnerHero/InnerHero';
import FilterControls from './FilterControls';
import ProjectGrid from './ProjectGrid';
import LoadMoreControls from './LoadMoreControls';
import projectImage from '../../assets/images/project.svg';
import behanceLogo from '../../assets/icons/inner/behance.svg';
import dribbleLogo from '../../assets/icons/inner/dribble.svg';

const OurWork = () => {
  const {
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
    totalProjects,
    showLoadMore,
    showShowLess,
    handleLoadMore,
    handleShowLess,
  } = useProjectFilters(projects);

  const containerRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const [lastAction, setLastAction] = useState(null);

  useEffect(() => {
    if ((projectsToShow > 4 || lastAction === 'showLess') && buttonContainerRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const buttonRect = buttonContainerRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollY = window.scrollY || window.pageYOffset;
          const buttonBottom = buttonRect.top + buttonRect.height + scrollY;

          window.scrollTo({
            top: buttonBottom - viewportHeight + 20,
            behavior: 'smooth',
          });
        });
      });
    }
  }, [projectsToShow, lastAction]);

  console.log('OurWork Debug:', {
    projectsToShow,
    totalProjects,
    showLoadMore,
    showShowLess,
    filteredProjectsLength: filteredProjects.length,
    lastAction,
    validServices,
    validTechnologies,
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Our Portfolio | Scons</title>
        <meta
          name="description"
          content="Explore Scons' portfolio of innovative tech projects, showcasing expertise in software development for startups and enterprises."
        />
        <meta
          name="keywords"
          content="Scons, portfolio, projects, software development, UK tech, startups, enterprises"
        />
        <link rel="canonical" href="https://sconstech.com/portfolio" />
        <meta property="og:title" content="Our Work | Scons" />
        <meta
          property="og:description"
          content="Explore Scons' portfolio of innovative tech projects, showcasing expertise in software development for startups and enterprises."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sconstech.com/portfolio" />
        <meta property="og:image" content={ogDefault} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Work | Scons" />
        <meta
          name="twitter:description"
          content="Explore Scons' portfolio of innovative tech projects, showcasing expertise in software development for startups and enterprises."
        />
        <meta name="twitter:image" content={ogDefault} />
      </Helmet>
      <InnerHero
        headingText="A Catalog of Our Work"
        spanText="Catalog"
        bodyText="A showcase of diverse projects that highlight our expertise in creating impactful, innovative tech solutions across industries."
        logoImages={[behanceLogo, dribbleLogo]}
        illustrationImage={projectImage}
        illustrationImageWidth="w-4/5 xl:w-3/4"
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
          validServices={validServices}
          validTechnologies={validTechnologies}
          isServiceClickable={isServiceClickable}
          isTechnologyClickable={isTechnologyClickable}
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
            setLastAction('loadMore');
            handleLoadMore();
          }}
          handleShowLess={() => {
            setLastAction('showLess');
            handleShowLess();
          }}
          buttonContainerRef={buttonContainerRef}
        />
      </div>
    </div>
  );
};

export default OurWork;