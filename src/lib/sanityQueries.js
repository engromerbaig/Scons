// sanityQueries.js

import sanityClient from './sanityClient';

/**
 * Fetches all blog posts, ordered by date descending.
 * @returns {Promise<Array>} - Array of blog posts.
 */
export const getPosts = async () => {
  try {
    const query = `*[_type == "post"] | order(date desc){
      _id,
      title,
      date,
      slug,
      mainImage { ..., asset-> { ..., metadata } },
      body
    }`;
    const posts = await sanityClient.fetch(query);
    return posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

/**
 * Fetches a single blog post by its slug.
 * @param {string} slug - The slug of the post to fetch.
 * @returns {Promise<Object|null>} - The blog post or null if not found.
 */
export const getPostBySlug = async (slug) => {
  if (!slug || typeof slug !== 'string') {
    console.error('Invalid slug provided');
    return null;
  }

  try {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      date,
      slug,
      mainImage { ..., asset-> { ..., metadata } },
      body
    }`;
    const post = await sanityClient.fetch(query, { slug });
    return post || null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
};