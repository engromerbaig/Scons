import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../lib/sanityImage';
import { format, isWithinInterval, subDays } from 'date-fns';
import { CiTimer } from 'react-icons/ci';
import calculateReadingTime from './calculateReadingTime';
import Button from '../../components/Button/Button';
import SkeletonLoader from '../../utilities/SkeletonLoader';

export default function BlogCard({ post }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Check if post data is ready
  useEffect(() => {
    if (post && post.title && post.publishedAt) {
      setIsLoaded(true);
      // Preload image to handle cached images
      if (post.mainImage) {
        const img = new Image();
        img.src = urlFor(post.mainImage).url();
        img.onload = () => setIsImageLoaded(true);
        img.onerror = () => setIsImageLoaded(true); // Treat errors as loaded
      }
    }
  }, [post]);

  // Guard clause for undefined post
  if (!post) {
    return (
      <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white h-[450px] flex flex-col">
        <SkeletonLoader className="w-full h-56" rounded="rounded-t-2xl" />
        <div className="p-5 flex flex-col flex-grow">
          <SkeletonLoader className="w-3/4 h-8 mb-3" />
          <SkeletonLoader className="w-1/2 h-4 mb-3" />
          <div className="flex flex-wrap gap-2 mb-4">
            <SkeletonLoader className="w-16 h-6 rounded-full" />
            <SkeletonLoader className="w-20 h-6 rounded-full" />
          </div>
          <SkeletonLoader className="w-20 h-8 rounded-md mt-auto" />
        </div>
      </div>
    );
  }

  const isNewPost = post.publishedAt
    ? isWithinInterval(new Date(post.publishedAt), {
        start: subDays(new Date(), 2),
        end: new Date(),
      })
    : false;

  // Validate image URL
  const imageUrl = post.mainImage && urlFor(post.mainImage).url();

  return (
    <Link
      to={`/blogs/${post.slug?.current || ''}`}
      className="group border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-[500px] flex flex-col"
    >
      <div className="relative flex-shrink-0">
        {isLoaded && imageUrl && isImageLoaded ? (
          <img
            src={imageUrl}
            alt={post.mainImage?.alt || post.title || 'Blog image'}
            className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : isLoaded && !imageUrl ? (
          <div className="w-full h-56 bg-gray-200 rounded-t-2xl flex items-center justify-center">
            <p className="text-gray-500 font-medium">No image</p>
          </div>
        ) : (
          <SkeletonLoader className="w-full h-56" rounded="rounded-t-2xl" />
        )}
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-700 flex items-center gap-1">
          <CiTimer className="text-lg" />
          <span>
            {isLoaded && post.body
              ? `${calculateReadingTime(post.body)} min read`
              : <SkeletonLoader className="w-16 h-4" />}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        {isLoaded ? (
          <h2 className="text-2xl font-bold mb-3 font-manrope text-gray-800 line-clamp-2 group-hover:text-neon transition-colors min-h-[3.5rem]">
            {post.title || 'Untitled'}
          </h2>
        ) : (
          <SkeletonLoader className="w-3/4 h-8 mb-3" />
        )}
        <div className="flex items-center text-sm text-gray-500 mb-3 min-h-[1.5rem]">
          {isLoaded ? (
            <>
              <span className="truncate">{post.author?.name || 'Anonymous'}</span>
              <span className="mx-2">•</span>
              <span className="truncate">
                {post.publishedAt
                  ? format(new Date(post.publishedAt), 'MMMM dd, yyyy')
                  : 'No date available'}
              </span>
            </>
          ) : (
            <SkeletonLoader className="w-1/2 h-4" />
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-4 min-h-[1rem]">
          {isLoaded && post.categories && post.categories.length > 0 ? (
            post.categories.map((category, index) => (
              <span
                key={index}
                className="text-xs font-semibold text-black bg-gray-200 rounded-full px-3 py-1 transition-colors group-hover:bg-neon/40 truncate"
              >
                {category.title || category}
              </span>
            ))
          ) : !isLoaded ? (
            <>
              <SkeletonLoader className="w-16 h-6 rounded-full" />
              <SkeletonLoader className="w-20 h-6 rounded-full" />
            </>
          ) : null}
        </div>
        <div className="mt-auto relative">
          {isLoaded ? (
            <Button
              name="Read More"
              fontSize="text-xs"
              className="py-1 px-2"
            />
          ) : (
            <SkeletonLoader className="w-20 h-8 rounded-md" />
          )}
          {isLoaded && isNewPost && (
            <div className="absolute bottom-1 right-[-20px] bg-neon text-black text-xs font-black px-8 py-1 transform -rotate-45 translate-x-6 translate-y-3">
              NEW
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}