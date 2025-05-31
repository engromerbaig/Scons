// pages/BlogDetails/BlogDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../../lib/sanityQueries';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../lib/sanityImage';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import { theme } from '../../theme';
import { format } from 'date-fns'; // Ensure date-fns is installed: npm install date-fns
import calculateReadingTime from '../Blogs/calculateReadingTime'; // Import calculateReadingTime

const BlogDetails = () => {
  const { blogSlug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      try {
        const data = await getPostBySlug(blogSlug);
        if (mounted) {
          if (!data) {
            setError('Blog post not found');
          } else {
            setPost(data);
          }
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load blog post');
        }
      }
    };

    fetchPost();

    return () => {
      mounted = false;
    };
  }, [blogSlug]);

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  if (!post) {
    return <p className="text-center mt-20">Loading blog...</p>;
  }

  const components = {
    types: {
      image: ({ value }) => (
        <img
          src={urlFor(value)
            .width(800)
            .auto('format')
            .fit('max')
            .url()}
          alt={value.alt || post.title || 'Blog image'}
          className="my-6 rounded-md w-full max-w-4xl mx-auto object-contain"
          loading="lazy"
        />
      ),
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-4xl font-bold my-4 font-manrope">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-semibold my-4 font-manrope">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold my-3 font-manrope">{children}</h3>
      ),
      normal: ({ children }) => (
        <p className="my-2 font-manrope text-gray-700">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc ml-6 my-4 font-manrope">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal ml-6 my-4 font-manrope">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="font-manrope">{children}</li>,
      number: ({ children }) => <li className="font-manrope">{children}</li>,
    },
  };

  return (
    <div
      className={`
        ${theme.layoutPages.paddingHorizontal} 
        ${theme.layoutPages.paddingVertical}
      `}
    >
      <Heading text={post.title || 'Untitled Blog Post'} centered={false} className='max-w-3xl' />
      <div className="flex flex-wrap gap-4 items-center mt-6 mb-12 text-sm text-gray-600">
        <span>{post.author?.name || 'Anonymous'}</span>
        <span>|</span>
        <span>
          {post.publishedAt
            ? format(new Date(post.publishedAt), 'MMMM dd, yyyy')
            : 'No date available'}
        </span>
        <span>|</span>
        <span>{calculateReadingTime(post.body)} min Read</span>
        {post.categories?.length > 0 && (
          <>
            <span>|</span>
            <span>
              {post.categories.map(category => category.title).join(', ')}
            </span>
          </>
        )}
      </div>

      {post.mainImage ? (
        <img
          src={urlFor(post.mainImage)
            .width(1200)
            .height(600)
            .auto('format')
            .fit('max')
            .url()}
          alt={post.mainImage.alt || post.title || 'Blog image'}
          className="w-full h-[32rem] rounded-xl object-cover mb-6 shadow-xl"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-[32rem] bg-gray-200 rounded-b-xl mb-6 flex items-center justify-center">
          <p>No image available</p>
        </div>
      )}

      <div className="prose max-w-none">
        <PortableText value={post.body || []} components={components} />
      </div>
    </div>
  );
};

export default BlogDetails;