import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { theme } from "../../theme";
import projects from "./projectDetails";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import SplideCarousel from "../../components/SplideCarousel/SplideCarousel";
import { technologiesData } from "../../components/Technologies/technologiesData";
import Button from "../../components/Button/Button";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className={`${theme.layoutPages.paddingVertical} min-h-screen`}>
      {/* Header Section */}
      <div className={`${theme.layoutPages.paddingHorizontal} flex flex-col gap-y-4`}>
        <img src={project.logo} alt={`${project.heading} logo`} className="w-1/5" />

        <Heading text={project.heading} centered={false} className="text-left" lineHeight="leading-none" />
    

      <div className="border-2 border-black text-center rounded-full w-40 px-2 py-1">
          <BodyText
            text={project.service}
            size="text-xs"
            fontWeight="font-semibold"
          />
        </div>
      </div>

      {/* Cover Image */}
      <img
        src={project.coverImage}
        alt={project.heading}
        className="w-full h-[600px] object-cover my-10"
      />

      {/* About Client Section */}
      <div
        className={`flex flex-col xl:flex-row justify-between gap-8 py-10 ${theme.layoutPages.paddingHorizontal}`}
      >
        <div className="flex flex-col gap-4 flex-1">
          <Heading text="About the Client" centered={false} lineHeight="leading-none" />
          <BodyText text={project.clientDetails} centered={false} />
          <div className="flex flex-row items-center">
            <BodyText text="Location:" fontWeight="font-semibold" className="mr-2" />
            <BodyText text={project.location} />
          </div>
        </div>

        <div className="flex-shrink-0">
          <img
            src={project.additionalImages[0]}
            alt="Project visual"
            className="w-[400px] rounded-md object-cover"
          />
        </div>
      </div>

      {/* Project Description & Technologies */}
      <div
  className={`flex flex-col xl:flex-row justify-between items-end gap-8 py-10 ${theme.layoutPages.paddingHorizontal}`}
>
        {/* Left: Description */}
        <div className="flex flex-col gap-4 flex-1">
          <Heading text={project.headline} centered={false} lineHeight="leading-none" />
          <BodyText text={project.details} centered={false} />
        </div>

        {/* Right: Tech Stack (bottom aligned) */}
        <div className="flex flex-col justify-start max-w-4xl items-start gap-2 xl:h-full">
          <BodyText text="Tech Used:" color="text-grayText" centered={false} fontWeight="font-semibold" />
          <div className="grid grid-cols-2 max-w-3xl gap-4 mt-2">
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
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Carousels */}
      <SplideCarousel
        images={project.additionalImages.slice(1, 4)}
        speed={1}
        height="400px"
        gap="1rem"
        pauseOnHover={false}
      />
      <SplideCarousel
        images={project.additionalImages.slice(4, 7)}
        speed={-1}
        height="400px"
        gap="1rem"
        pauseOnHover={false}
      />
    </div>
  );
};

export default ProjectDetail;
