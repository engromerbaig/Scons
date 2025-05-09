import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { theme } from "../../theme";
import projects from "./projectDetails";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";

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
    <div
      className={` ${theme.layoutPages.paddingVertical} min-h-screen`}
    >

      <div className={` ${theme.layoutPages.paddingHorizontal} flex flex-col items-start justify-center gap-y-2`}>
      <img src={project.logo} alt={`${project.heading} logo`} className="w-1/5 " />

        <Heading text={project.heading} className="text-left" />

        <div className="border-2 border-black rounded-full px-2 py-1">
        <BodyText
        text={project.service}
        size="text-xs"
        fontWeight="font-semibold"
        />

        </div>

        </div>

{/* the fullwidth image without horizontal paddings */}
        <img src={project.coverImage} alt={project.heading} className="w-full h-[600px] object-cover py-10" />

      <div className="flex flex-col xl:flex-row justify-center items-center gap-4">
        <div className="flex flex-col items-start justify-center gap-y-2">
        <Heading
          text="About the Project"
          centered={false}
          lineHeight="leading-loose"
        />

        <BodyText
          text={project.bodyText}
          size="text-25px"
          />
          </div>
     
     <img src={project.coverImage} alt="" />
      
      </div>



      <Link
          to="/portfolio"
          className="inline-block mt-6 px-4 py-2 bg-blue-500 text-white w-48  rounded-full"
        >
          Back to Portfolio
        </Link>
    </div>
  );
};

export default ProjectDetail;