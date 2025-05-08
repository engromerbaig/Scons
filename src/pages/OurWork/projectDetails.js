import importProjectImages from "../../utilities/importProjectImages";
import projectData from "../../data/projects.json";

// Function to generate slug dynamically
const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

// Enhance data by adding slugs and images
const projects = projectData.map(project => ({
  ...project,
  slug: generateSlug(project.name),
  images: importProjectImages(project.id) // Dynamically import images for each project
}));

export default projects;
