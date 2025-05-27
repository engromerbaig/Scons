import React, { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";

// Lazy load all components
const Heading = lazy(() => import("../../components/Heading/Heading"));
const BodyText = lazy(() => import("../../components/BodyText/BodyText"));
const SplideCarousel = lazy(() => import("../../components/SplideCarousel/SplideCarousel"));
const Button = lazy(() => import("../../components/Button/Button"));
const HorizontalScroller = lazy(() => import("../../components/HorizontalScroller/HorizontalScroller"));
const ImpactSection = lazy(() => import("./ImpactSection"));
const Vision = lazy(() => import("../../components/Vision/Vision"));
const InnerHero = lazy(() => import("../../components/InnerHero/InnerHero"));
const SkeletonLoader = lazy(() => import("../../utilities/SkeletonLoader"));
const Deliverables = lazy(() => import("./Deliverables"));
const FadeWrapper = lazy(() => import("../../utilities/Animations/FadeWrapper"));
const FadeInSection = lazy(() => import("../../utilities/Animations/FadeInSection"));

// Static imports for non-component data
import { theme } from "../../theme";
import projects from "./projectDetails";
import { technologiesData } from "../../components/Technologies/technologiesData";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLayoutEffect } from "react";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  // State to track image loading
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);
  const [additionalImageLoaded, setAdditionalImageLoaded] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setCoverImageLoaded(false);
    setAdditionalImageLoaded(false);
  }, [slug]);

  const findTechnologyIcon = (techName) => {
    for (const category in technologiesData) {
      for (const platform in technologiesData[category]) {
        const tech = technologiesData[category][platform].find(
          (t) => t.name.toLowerCase() === techName.toLowerCase()
        );
        if (tech) return tech.icon;
      }
    }
    return null;
  };

  if (!project) {
    return <div className="text-center py-20">Project not found</div>;
  }

  return (
    <div className={`${theme.layoutPages.paddingBottom} min-h-screen`}>
      <InnerHero
        logoImages={[project.logo]}
        headingText={project.heading}
        bodyText={project.bodyText}
        height="h-auto"
        headingColor="text-black"
        showBottomShadow={false}
        showPattern={false}
      >
        <div className="flex flex-wrap gap-2 items-start justify-start">
          {(Array.isArray(project.service) ? project.service : [project.service]).map((serviceItem, index) => (
            <div
              key={index}
              className="border-2 border-black text-center rounded-full px-4 py-1 w-fit"
            >
              <BodyText
                text={serviceItem}
                size="text-xs"
                fontWeight="font-semibold"
                color="text-black"
              />
            </div>
          ))}
        </div>
      </InnerHero>

      <FadeInSection>
        <div className="relative w-full h-full">
          {!coverImageLoaded && (
            <SkeletonLoader className="absolute top-0 left-0 w-full h-full" />
          )}
          <img
            src={project.coverImage}
            alt={project.heading}
            className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              coverImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setCoverImageLoaded(true)}
          />
        </div>
      </FadeInSection>

      {/* About Client Section */}
      <div
        className={`flex flex-col xl:flex-row justify-between gap-8 ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}
      >
        <div className="flex flex-col gap-4 xl:w-1/2 w-full">
          <Heading
            text="About the Client"
            spanText="Client"
            spanColor="text-neon"
            centered={false}
            lineHeight="leading-none"
            size="text-60px"
          />
          <BodyText text={project.clientDetails} centered={false} />
          <div className="flex flex-row items-center">
            <BodyText
              text="Location:"
              fontWeight="font-semibold"
              className="mr-2"
            />
            <BodyText text={project.location} />
          </div>
        </div>

        {/* Additional Image with skeleton */}
        <div className="flex items-center xl:w-1/2 w-full justify-center relative">
          {!additionalImageLoaded && (
            <SkeletonLoader className="absolute top-0 left-0 w-full h-full" />
          )}
          <img
            src={project.additionalImages[0]}
            alt="Project visual"
            className={`w-full max-w-[800px] rounded-md object-contain transition-opacity duration-500 ease-in-out ${
              additionalImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setAdditionalImageLoaded(true)}
          />
        </div>
      </div>

      <FadeWrapper>
        {/* Project Description & Technologies */}
        <div
          className={`flex flex-col xl:flex-row justify-between items-end gap-8 ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}
        >
          {/* Left: Description */}
          <div className="flex flex-col gap-4 xl:w-3/5 w-full">
            <Heading
              text={project.headline}
              centered={false}
              lineHeight="leading-none"
              color="text-black"
            />
            <BodyText text={project.details} centered={false} color="text-black" />
          </div>

          {/* Right: Tech Stack (bottom aligned) */}
          <div className="flex flex-col justify-start items-start gap-2 xl:w-2/5 w-full">
            <BodyText
              text="Stack Used:"
              color="text-grayText"
              centered={false}
              fontWeight="font-bold"
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              {project.technologies.map((tech, index) => {
                const icon = findTechnologyIcon(tech);
                return (
                  <Button
                    key={index}
                    name={tech}
                    icon={icon}
                    hoverBgColor="bg-neon"
                    hoverTextColor="text-black"
                    noIconChange={true}
                    bgColor="bg-gray-100"
                    textColor="black"
                    fontWeight="font-semibold"
                    className="py-3"
                    fontSize="text-xs xl:text-sm"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </FadeWrapper>

      <FadeWrapper>
        <div className={`${theme.layoutPages.paddingVertical}`}>
          {project.additionalImages.slice(1, 4).some((img) => img) && (
            <SplideCarousel
              images={project.additionalImages.slice(1, 4)}
              speed={1}
              height="400px"
              gap="1rem"
              objectFit="contain"
              haveBgBlurred={true}
              pauseOnHover={false}
            />
          )}

          {project.additionalImages.slice(4, 7).some((img) => img) && (
            <SplideCarousel
              images={project.additionalImages.slice(4, 7)}
              speed={-1}
              height="400px"
              gap="1rem"
               objectFit="contain"
              haveBgBlurred={true}
              pauseOnHover={false}
            />
          )}
        </div>
      </FadeWrapper>

      {/* Deliverables & Outcomes */}
      <Deliverables deliverables={project.deliverables} heading={project.heading} />

      <HorizontalScroller
        heading={`How ${project.heading} came to life`}
        spanHeading={project.heading}
        bodyText="Scons brings projects to life with a clear and proven process—starting from strategic planning and architecture design, followed by precise development focused on performance and scalability. Each project is thoroughly tested and refined through client feedback to ensure a smooth, successful launch."
      />

      {/* Impact section */}
      <ImpactSection heading={project.heading} introText={project.impactIntro} impacts={project.impacts} />

      <Vision />
    </div>
  );
};

export default ProjectDetail;