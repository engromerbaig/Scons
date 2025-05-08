// src/utils/importProjectImages.js

function importProjectImages(projectId) {
  try {
    // Use import.meta.glob to dynamically import all project images
    const images = import.meta.glob(
      "/src/assets/images/projects/**/*.{jpg,jpeg,png,webp}",
      { eager: true }
    );

    // Filter images for the specific project ID
    const projectImages = Object.keys(images)
      .filter((key) => key.includes(`/${projectId}/`)) // Match images in the project's folder
      .map((key) => images[key].default); // Resolve the image paths

    return projectImages;
  } catch (error) {
    console.error(`Error importing images for project ${projectId}:`, error);
    return [];
  }
}

export default importProjectImages;