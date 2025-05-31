// pages/BlogDetails/BlogDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../../lib/sanityQueries';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../lib/sanityImage';
import InnerHero from '../../components/InnerHero/InnerHero';
import BodyText from '../../components/BodyText/BodyText';
import { theme } from '../../theme';
import { format } from 'date-fns'; // Ensure date-fns is installed

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
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Blog image'}
          className="my-6 rounded-md w-full"
        />
      ),
    },
    block: {
      h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
      h2: ({ children }) => <h2 className="text-3xl font-semibold my-4">{children}</h2>,
      h3: ({ children }) => <h3 className="text-2xl font-semibold my-3">{children}</h3>,
      normal: ({ children }) => <p className="my-2">{children}</p>,
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc ml-6 my-4">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal ml-6 my-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
  };

  return (
    <div className="flex flex-col items-center">
      <InnerHero
        headingText={post.title || 'Untitled Blog Post'}
        spanText=""
        headingSize="text-70px"
        breakSpan1={true}
        bottomShadow={false}
      />

      <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingBottom}`}>
        {post.mainImage ? (
          <img
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title || 'Blog image'}
            className="w-full h-[32rem] rounded-b-xl object-cover mb-6 shadow-xl"
          />
        ) : (
          <div className="w-full h-[32rem] bg-gray-200 rounded-b-xl mb-6 flex items-center justify-center">
            <p>No image available</p>
          </div>
        )}
        <BodyText
          text={
            post.publishedAt
              ? format(new Date(post.publishedAt), 'MMMM dd, yyyy')
              : 'No date available'
          }
          size="text-35px"
          centered={false}
          className="mb-6"
        />

        <div className="prose max-w-none">
          <PortableText value={post.body || []} components={components} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;