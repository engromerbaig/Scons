import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../lib/sanityImage';
import { format } from 'date-fns';
import { CiTimer } from 'react-icons/ci';
import calculateReadingTime from './calculateReadingTime';
import Button from '../../components/Button/Button';

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blogs/${post.slug?.current || ''}`}
      className="group block border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 "
    >
      <div className="relative">
        {post.mainImage ? (
          <img
            src={urlFor(post.mainImage).url()}
            alt={post.mainImage?.alt || post.title || 'Blog image'}
            className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-2xl flex items-center justify-center">
            <p className="text-gray-500 font-medium">No image</p>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-700 flex items-center gap-1">
          <CiTimer className="text-lg" />
          <span>{calculateReadingTime(post.body)} min read</span>
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-3 font-manrope text-gray-800 line-clamp-2 group-hover:text-neon transition-colors">
          {post.title || 'Untitled'}
        </h2>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{post.author?.name || 'Anonymous'}</span>
          <span className="mx-2">•</span>
          <span>
            {post.publishedAt
              ? format(new Date(post.publishedAt), 'MMMM dd, yyyy')
              : 'No date available'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories?.map((category, index) => (
            <span
              key={index}
              className="text-xs font-semibold text-black bg-gray-200 rounded-full px-3 py-1 transition-colors group-hover:bg-neon/40"
            >
              {category.title || category}
            </span>
          ))}
        </div>
        <Button
          name="Read More"
          fontSize="text-xs"
          className="py-1 px-2   text-center"
        />
      </div>
    </Link>
  );
}