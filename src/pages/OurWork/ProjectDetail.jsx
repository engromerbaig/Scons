import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { theme } from "../../theme";
import projects from "./projectDetails";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // Import Splide CSS

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          className="w-1/5 "
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
          <BodyText text={project.service} size="text-xs" fontWeight="font-semibold" />
        </div>
      </div>

      {/* Full-width image without horizontal paddings */}
      <img
        src={project.heroImage}
        alt={project.heading}
        className="w-full h-[600px] object-cover py-10"
      />

      <div
        className={`flex flex-col xl:flex-row justify-between items-center gap-8 py-4 xl:py-10 ${theme.layoutPages.paddingHorizontal}`}
      >
        {/* Left Section (Text) */}
        <div className="flex flex-col items-start gap-4 flex-1">
          <Heading
            text="About the Project"
            centered={false}
            lineHeight="leading-loose"
          />

          <BodyText text={project.details} centered={false} />

          <div className="flex flex-row items-center">
            <BodyText text="Location:" fontWeight="font-semibold" className="mr-2" />
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

      {/* Splide Carousel Section */}
      <div className={`py-10`}>
  <Splide
    options={{
      type: "loop", // Enables infinite loop
      perPage: 2, // Show two images at a time
      perMove: 1, // Move one image at a time
      autoplay: true, // Auto-scroll
      interval: 3000, // 3 seconds per slide
      pauseOnHover: true,
      arrows: true, // Show navigation arrows
      pagination: true, // Show pagination dots
      gap: "1rem", // Space between slides
    }}
    aria-label="Project Images Carousel"
  >
    {project.additionalImages.slice(1, 5).map((image, index) => (
      <SplideSlide key={index}>
        <img
          src={image}
          alt={`Project image ${index + 2}`}
          className="w-full h-[400px] object-cover rounded-3xl border-4 border-black"
        />
      </SplideSlide>
    ))}
  </Splide>
</div>

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