import importProjectImages from "../../utilities/importProjectImages";
import projectData from "../../data/projects.json";

const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const projects = projectData.map((project) => ({
  ...project,
  slug: generateSlug(project.heading),
  ...importProjectImages(project.id),
}));

export default projects;