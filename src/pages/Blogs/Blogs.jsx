import React, { useEffect, useState } from 'react';
import { getPosts } from '../../lib/sanityQueries';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../lib/sanityImage';
import { theme } from '../../theme';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';

export default function Blogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  // Custom components for PortableText rendering
  const components = {
    types: {
      image: ({ value }) => {
        return (
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog image'}
            className="my-6 rounded-md"
          />
        );
      },
    },
    marks: {
      link: ({ children, value }) => {
        const href = value.href || '';
        return (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
        <Heading
          text="Blogs & News"
          centered={false}
          />
          <BodyText
          text="Read our latest blog posts!"
          centered={false}
          />
      {/* <h1 className="text-3xl font-bold mb-6">Blog Posts</h1> */}
      {posts.length === 0 && <p>Loading posts...</p>}
      {posts.map(post => (
        <article key={post._id} className="mb-12 border-b pb-6">
          <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>

          {/* Render the body with custom components */}
          <PortableText value={post.body} components={components} />
        </article>
      ))}
    </div>
  );
}
