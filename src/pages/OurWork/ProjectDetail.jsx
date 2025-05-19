import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { theme } from "../../theme";
import projects from "./projectDetails";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import SplideCarousel from "../../components/SplideCarousel/SplideCarousel";
import { technologiesData } from "../../components/Technologies/technologiesData";
import Button from "../../components/Button/Button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import HorizontalScroller from "../../components/HorizontalScroller/HorizontalScroller";
import ImpactSection from "./ImpactSection";
import Vision from "../../components/Vision/Vision";
import InnerHero from "../../components/InnerHero/InnerHero";
import SkeletonLoader from "../../utilities/SkeletonLoader";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  // State to track image loading
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);
  const [additionalImageLoaded, setAdditionalImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset loading states if slug changes (optional)
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
    return <div className="text-center py-20">Story not found</div>;
  }

  return (
    <div className={`${theme.layoutPages.paddingBottom} min-h-screen`}>
      <InnerHero
        logoImage={project.logo}
        headingText={project.heading}
        bodyText={project.bodyText}
        height="h-auto"
        headingColor="text-black"
        showBottomShadow={false}
        showPattern={false}
      >
        <div className="border-2 border-black text-center rounded-full w-40 px-2 py-1">
          <BodyText
            text={project.service}
            size="text-xs"
            fontWeight="font-semibold"
            color="text-black"
          />
        </div>
      </InnerHero>

      {/* Cover Image with skeleton */}
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


{/* splide part */}
     <div className={`${theme.layoutPages.paddingVertical}`}>
  {project.additionalImages.slice(1, 4).some((img) => img) && (
    <SplideCarousel
      images={project.additionalImages.slice(1, 4)}
      speed={1}
      height="400px"
      gap="1rem"
      pauseOnHover={false}
    />
  )}

  {project.additionalImages.slice(4, 7).some((img) => img) && (
    <SplideCarousel
      images={project.additionalImages.slice(4, 7)}
      speed={-1}
      height="400px"
      gap="1rem"
      pauseOnHover={false}
    />
  )}
</div>


      {/* Deliverables & Outcomes */}
      <div
        className={`flex flex-col gap-4  ${theme.layoutPages.paddingBottom} ${theme.layoutPages.paddingHorizontal}`}
      >
        <Heading
          text="Deliverables & Outcomes"
          centered={false}
          color="text-black"
          lineHeight="leading-none"
        />

        <div className="grid grid-cols-1  gap-4 ">
          {project.deliverables.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <IoIosCheckmarkCircle className="text-neon mt-1 shrink-0" size={20} />
              <BodyText text={item} centered={false} color="text-black" />
            </div>
          ))}
        </div>
      </div>

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
