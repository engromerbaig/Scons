import React from "react";
import { useParams } from "react-router-dom";
import { theme } from "../../theme"; // Adjust the path as needed
import projects from "./projectDetails";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div className="text-center py-20">Story not found</div>;
  }

  return (
    <div className={theme.layoutPages.paddingHorizontal}>
      <h2 className="text-3xl font-bold">{project.heading}</h2>
      <p className="mt-4 text-gray-700">{project.bodyText}</p>
    </div>
  );
};

export default ProjectDetail;
