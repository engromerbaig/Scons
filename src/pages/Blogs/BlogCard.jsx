// pages/Blogs/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../lib/sanityImage';
import { format } from 'date-fns'; // Ensure date-fns is installed
import calculateReadingTime from './calculateReadingTime';

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blogs/${post.slug?.current || ''}`}
      className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
    >
      {post.mainImage ? (
        <img
          src={urlFor(post.mainImage).url()}
          alt={post.mainImage?.alt || post.title || 'Blog image'}
          className="rounded-lg w-full h-60 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-60 bg-gray-200 rounded-lg flex items-center justify-center">
          <p>No image</p>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 font-manrope">{post.title || 'Untitled'}</h2>
        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600 mb-1">
          <span>{post.author?.name || 'Anonymous'}</span>
          <span>|</span>
          <span>
            {post.publishedAt
              ? format(new Date(post.publishedAt), 'MMMM dd, yyyy')
              : 'No date available'}
          </span>
          <span>|</span>
          <span>{calculateReadingTime(post.body)} min read</span>
        </div>
      </div>
    </Link>
  );
}