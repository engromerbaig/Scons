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
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} min-h-screen`}
    >
      <div className="flex flex-col gap-4">
        <img src={project.coverImage} alt={project.heading} className="w-full h-[600px] object-cover rounded-3xl mb-4" />
        <img src={project.logo} alt={`${project.heading} logo`} className="w-1/4 mb-4" />
        <Heading text={project.heading} size="text-35px" fontWeight="font-semibold" centered={false} />
        <BodyText
          text={project.bodyText}
          size="text-25px"
          centered={false}
          lineHeight="leading-loose"
        />
        <Link
          to="/portfolio"
          className="inline-block mt-6 px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetail;