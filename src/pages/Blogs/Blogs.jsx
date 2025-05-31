// pages/Blogs/Blogs.jsx

import React, { useEffect, useState } from 'react';
import { getPosts } from '../../lib/sanityQueries';
import { urlFor } from '../../lib/sanityImage';
import { theme } from '../../theme';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';

// Helper: Estimate reading time
const calculateReadingTime = (body) => {
  const wordsPerMinute = 200;
  if (!body || !Array.isArray(body)) return 0;
  const text = body
    .filter(block => block._type === 'block' && block.children)
    .map(block => block.children.map(c => c.text).join(' '))
    .join(' ');
  const words = text.split(/\s+/).length || 0;
  return Math.ceil(words / wordsPerMinute);
};

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        if (mounted) {
          setPosts(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load posts');
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  if (loading) {
    return <p className="text-center mt-20">Loading posts...</p>;
  }

  return (
    <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      <Heading text="Blogs & News" centered={false} />
      <BodyText text="Read our latest blog posts!" centered={false} />

      {posts.length === 0 && <p className="text-center mt-6">No posts available</p>}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {posts.map(post => (
          <Link
            to={`/blogs/${post.slug?.current || ''}`}
            key={post._id}
            className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            {post.mainImage ? (
              <img
                src={urlFor(post.mainImage).url()}
                alt={post.title || 'Blog image'}
                className="rounded-lg w-full h-60 object-cover"
              />
            ) : (
              <div className="w-full h-60 bg-gray-200 rounded-lg flex items-center justify-center">
                <p>No image</p>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title || 'Untitled'}</h2>
              <p className="text-sm text-gray-600 mb-1">
                {post.date ? new Date(post.date).toLocaleDateString() : 'No date'}
              </p>
              <p className="text-sm text-gray-600">
                {calculateReadingTime(post.body)} min read
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}