// src/utils/slugify.js
export const slugify = (text) =>
    text
        .toLowerCase()
        .replace(/[/\s]+/g, '-')   // Replace spaces and forward slashes with hyphens
        .replace(/[^\w-]+/g, '');  // Remove non-word characters except hyphens