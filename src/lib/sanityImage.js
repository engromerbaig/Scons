// lib/sanityImage.js

import sanityClient from './sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

/**
 * Generates a URL for a Sanity image source.
 * @param {object} source - The Sanity image source object.
 * @returns {object} - The image URL builder instance.
 * @throws {Error} - If the source is invalid.
 */
export function urlFor(source) {
  if (!source) {
    throw new Error('Image source is undefined or null');
  }
  return builder.image(source);
}