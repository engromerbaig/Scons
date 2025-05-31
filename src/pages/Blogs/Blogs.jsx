import React, { useEffect, useState } from 'react';
import { getPosts } from '../../../lib/sanityQueries';
import { PortableText } from '@portabletext/react';
import { theme } from '../../theme';

export default function Blogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      {posts.length === 0 && <p>Loading posts...</p>}
      {posts.map(post => (
        <article key={post._id} className="mb-12 border-b pb-6">
          <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>

          {/* Render the body using PortableText */}
          <PortableText value={post.body} />

          {/* Optional: add date, author, images here */}
        </article>
      ))}
    </div>
  );
}
