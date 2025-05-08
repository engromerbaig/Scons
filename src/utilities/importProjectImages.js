function importProjectImages(projectId) {
  try {
    const images = import.meta.glob(
      "/src/assets/images/projects/**/*.{jpg,jpeg,png,webp}",
      { eager: true }
    );

    const projectImages = Object.keys(images)
      .filter((key) => key.includes(`/${projectId}/`))
      .sort((a, b) => {
        // Extract the image number (e.g., "1" from "1.jpg")
        const numA = parseInt(a.match(/\/(\d+)\.\w+$/)[1], 10);
        const numB = parseInt(b.match(/\/(\d+)\.\w+$/)[1], 10);
        return numA - numB;
      })
      .map((key) => images[key].default);

    // Log for debugging
    console.log(`Imported images for project ${projectId}:`, projectImages);

    return {
      logo: projectImages[0] || "", // Image 1 as logo
      coverImage: projectImages[1] || "", // Image 2 as cover
      additionalImages: projectImages.slice(2) // Images 3, 4, etc. for future use
    };
  } catch (error) {
    console.error(`Error importing images for project ${projectId}:`, error);
    return { logo: "", coverImage: "", additionalImages: [] };
  }
}

export default importProjectImages;