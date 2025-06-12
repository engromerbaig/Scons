function importProjectImages(projectId) {
  try {
    // Import images and videos
    const assets = import.meta.glob(
      "/src/assets/images/projects/**/*.{jpg,jpeg,png,webp,svg,mp4}",
      { eager: true }
    );

    // Filter and sort images
    const projectImages = Object.keys(assets)
      .filter((key) => key.includes(`/${projectId}/`) && !key.endsWith('.mp4'))
      .sort((a, b) => {
        // Extract the image number (e.g., "1" from "1.jpg" or "1.svg")
        const numA = parseInt(a.match(/\/(\d+)\.\w+$/)?.[1] || '0', 10);
        const numB = parseInt(b.match(/\/(\d+)\.\w+$/)?.[1] || '0', 10);
        return numA - numB;
      })
      .map((key) => assets[key].default);

    // Find video (e.g., "video.mp4")
    const projectVideo = Object.keys(assets).find(
      (key) => key.includes(`/${projectId}/`) && key.endsWith('.mp4')
    );

    // Log for debugging
    console.log(`Imported assets for project ${projectId}:`, {
      images: projectImages,
      video: projectVideo ? assets[projectVideo].default : null,
    });

    return {
      logo: projectImages[0] || "", // Image 1 as logo
      coverImage: projectImages[1] || "", // Image 2 as cover
      additionalImages: projectImages.slice(2), // Images 3, 4, etc.
      video: projectVideo ? assets[projectVideo].default : null, // Optional video
    };
  } catch (error) {
    console.error(`Error importing assets for project ${projectId}:`, error);
    return { logo: "", coverImage: "", additionalImages: [], video: null };
  }
}

export default importProjectImages;