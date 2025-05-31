// pages/Blogs/Blogs.jsx

import React, { useEffect, useState } from 'react';
import { getPosts } from '../../lib/sanityQueries';
import { theme } from '../../theme';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import BlogCard from './BlogCard';

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
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
