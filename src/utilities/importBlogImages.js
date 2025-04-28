// src/utils/importBlogImages.js
function importBlogImages(blogId) {
  try {
    const images = import.meta.glob(
      '/src/assets/images/blogs/**/*.{jpg,jpeg,png,webp}',
      { eager: true }
    );

    // Helper to find the first matching image for a base name
    const findImage = (basePath) => {
      const match = Object.keys(images).find((key) =>
        key.startsWith(basePath)
      );
      return images[match]?.default || '';
    };

    const fallbackBases = [
      '/src/assets/images/blogs/1',
      '/src/assets/images/blogs/2',
      '/src/assets/images/blogs/3'
    ];

    const fallbackImages = fallbackBases.map(findImage);

    const shuffledFallbacks = fallbackImages.sort(() => Math.random() - 0.5);

    return {
      image: findImage(`/src/assets/images/blogs/${blogId}/1`) || shuffledFallbacks[0],
      image2: findImage(`/src/assets/images/blogs/${blogId}/2`) || shuffledFallbacks[1],
      image3: findImage(`/src/assets/images/blogs/${blogId}/3`) || shuffledFallbacks[2]
    };
  } catch (error) {
    console.error(`Error importing images for blog ${blogId}:`, error);

    // Fallbacks in case of error
    return {
      image: '',
      image2: '',
      image3: ''
    };
  }
}

export default importBlogImages;
