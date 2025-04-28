// src/utils/importJobImages.js
import placeholderImage from '../assets/images/jobs/job-placeholder.webp';

function importJobImages(jobTypeSlug) {
  try {
    // Use import.meta.glob to dynamically import all job images
    const images = import.meta.glob(
      "/src/assets/images/jobs/**/*.{jpg,jpeg,png,webp}",
      { eager: true }
    );

    // Find the image for the specific job type slug
    const imagePath = Object.keys(images).find((key) => key.includes(`/${jobTypeSlug}.`));

    return imagePath ? images[imagePath].default : placeholderImage;
  } catch (error) {
    console.error(`Error importing image for job type ${jobTypeSlug}:`, error);
    return placeholderImage;
  }
}

export default importJobImages;