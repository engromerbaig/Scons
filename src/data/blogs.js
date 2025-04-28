// src/data/blogs.js
import blogData from './blogs.json';
import importBlogImages from '../utilities/importBlogImages';
import { slugify } from '../utilities/slugify';

const blogs = blogData.map(blog => {
  const images = importBlogImages(blog.id);
  
  return {
    ...blog,
    slug: slugify(blog.title),
    ...images  // Spread the image objects directly into the blog
  };
});

export default blogs;