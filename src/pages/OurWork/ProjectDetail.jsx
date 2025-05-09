import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

  // Function to find technology icon
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
      <div
        className={`${theme.layoutPages.paddingHorizontal} flex flex-col items-start justify-center gap-y-2`}
      >
        <img
          src={project.logo}
          alt={`${project.heading} logo`}
          className="w-1/5"
        />

        <Heading
          text={project.heading}
          centered={false}
          className="text-left leading-tight"
        />
        <Heading
          text={project.headline}
          centered={false}
          size="text-40px"
          fontWeight="font-medium"
          className="text-left leading-tight"
        />

        <div className="border-2 border-black rounded-full px-2 py-1">
          <BodyText
            text={project.service}
            size="text-xs"
            fontWeight="font-semibold"
          />
        </div>
      </div>

      {/* Full-width image without horizontal paddings */}
      <img
        src={project.coverImage}
        alt={project.heading}
        className="w-full h-[600px] object-cover py-10"
      />

      <div
        className={`flex flex-col xl:flex-row justify-between items-center gap-8 py-4 xl:py-10 ${theme.layoutPages.paddingHorizontal}`}
      >
        {/* Left Section (Text) */}
        <div className="flex flex-col items-start gap-4 flex-1">
          <Heading
            text="About the Client"
            centered={false}
            lineHeight="leading-loose"
          />

          <BodyText text={project.details} centered={false} />

          <div className="flex flex-row items-center">
            <BodyText
              text="Location:"
              fontWeight="font-semibold"
              className="mr-2"
            />
            <BodyText text={project.location} />
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="flex-shrink-0">
          <img
            src={project.additionalImages[0]}
            alt="Project visual"
            className="w-[400px] rounded-md object-cover"
          />
        </div>




      </div>



      <div
        className={`flex flex-col xl:flex-row justify-between items-center gap-8 py-4 xl:py-10 ${theme.layoutPages.paddingHorizontal}`}
      >
        {/* Left Section (Text) */}
        <div className="flex flex-col items-start gap-4 flex-1">
          <Heading
            text={project.headline}
            centered={false}
            lineHeight="leading-loose"
          />

          <BodyText text={project.details} centered={false} />

     
        </div>

        {/* Techs */}

        {/* vertically align it at bottom i.e. end*/}
        <div
        className={`flex flex-col `}
      >
    
        <BodyText
          text="Tech Used:"
          centered={false}
        />
        
      <div className="grid grid-cols-2 max-w-3xl gap-4 mt-4 ">
  {project.technologies.map((tech, index) => {
    const icon = findTechnologyIcon(tech);
    return (
      <Button
        hoverBgColor="bg-neon"
        hoverTextColor="text-black"
        noIconChange={true}
        key={index}
        name={tech}
        icon={icon}
      />
    );
  })}
</div>

      </div>


      </div>

    

      {/* First Carousel: additionalImages[1], [2], [3] */}
      <SplideCarousel
        images={project.additionalImages.slice(1, 4)}
        speed={1}
        height="400px"
        gap="1rem"
        pauseOnHover={false}
      />


      

      {/* Second Carousel: additionalImages[4], [5], [6] */}
      <SplideCarousel
        images={project.additionalImages.slice(4, 7)}
        speed={-1}
        height="400px"
        gap="1rem"
        pauseOnHover={false}
      />

      {/* Project Features Section */}
   

      {/* Uncomment if you want the Back to Portfolio link */}
      {/* <Link
        to="/portfolio"
        className="inline-block mt-6 px-4 py-2 bg-blue-500 text-white w-48 rounded-full"
      >
        Back to Portfolio
      </Link> */}
    </div>
  );
};

export default ProjectDetail;