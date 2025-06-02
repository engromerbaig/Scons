import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../lib/sanityImage';
import { getPostBySlug, getPosts } from '../../lib/sanityQueries';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import BlogCard from '../Blogs/BlogCard';
import SkeletonLoader from '../../utilities/SkeletonLoader';
import { theme } from '../../theme';
import { format } from 'date-fns';
import calculateReadingTime from '../Blogs/calculateReadingTime';
import { FaTwitter, FaLinkedin, FaLink } from 'react-icons/fa';
import { CiTimer } from 'react-icons/ci';

const BlogDetails = () => {
  const { blogSlug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState([]);

  // Helper function to extract text from portable text blocks
  const extractTextFromBlock = (block) => {
    if (!block.children || !Array.isArray(block.children)) return '';
    return block.children
      .map(child => child.text || '')
      .join('')
      .trim();
  };

  useEffect(() => {
    let mounted = true;
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const postData = await getPostBySlug(blogSlug);
        // Fetch more posts to ensure we have enough after filtering
        const allPostsData = await getPosts(blogSlug, 6);
        
        if (mounted) {
          if (!postData) {
            setError('Blog post not found');
          } else {
            setPost(postData);
            
            // Extract headings with better text extraction
            const extractedHeadings = postData.body
              ?.filter(block => block._type === 'block' && ['h1', 'h2', 'h3'].includes(block.style))
              .map(block => ({
                id: block._key,
                level: block.style,
                text: extractTextFromBlock(block),
              }))
              .filter(heading => heading.text) || []; // Only include headings with text
            
            setHeadings(extractedHeadings);
          }
          
          // Filter out current post and limit to 4
          const filteredPosts = (allPostsData || [])
            .filter(relatedPost => relatedPost._id !== postData?._id)
            .slice(0, 4);
          
          setRelatedPosts(filteredPosts);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load blog post');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [blogSlug]);

  const shareUrl = window.location.href;
  const shareTitle = post?.title || 'Blog Post';
  const shareOnTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  const shareOnLinkedIn = () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  const copyLink = () => navigator.clipboard.writeText(shareUrl).then(() => alert('Link copied to clipboard!'));

  const components = {
    types: {
      image: ({ value }) => value && (
        <img
          src={urlFor(value)
            .width(800)
            .auto('format')
            .fit('max')
            .url()}
          alt={value.alt || post?.title || 'Blog image'}
          className="my-6 rounded-md w-full max-w-4xl mx-auto object-contain"
          loading="lazy"
        />
      ),
    },
    block: {
      h1: ({ children, node }) => node && children && (
        <h1 id={node._key} className="text-4xl md:text-5xl font-bold my-6 font-manrope">{children}</h1>
      ),
      h2: ({ children, node }) => node && children && (
        <h2 id={node._key} className="text-3xl md:text-4xl font-semibold my-5 font-manrope">{children}</h2>
      ),
      h3: ({ children, node }) => node && children && (
        <h3 id={node._key} className="text-2xl md:text-3xl font-semibold my-4 font-manrope">{children}</h3>
      ),
      normal: ({ children }) => children && (
        <p className="my-3 font-manrope text-gray-800 leading-relaxed text-base md:text-lg">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }) => children && (
        <ul className="list-disc ml-6 my-4 font-manrope text-gray-800">{children}</ul>
      ),
      number: ({ children }) => children && (
        <ol className="list-decimal ml-6 my-4 font-manrope text-gray-800">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => children && <li className="font-manrope my-1">{children}</li>,
      number: ({ children }) => children && <li className="font-manrope my-1">{children}</li>,
    },
  };

  const renderSkeleton = () => (
    <div className="animate-pulse">
      <SkeletonLoader className="w-3/4 h-12 mb-6" />
      <div className="flex flex-wrap gap-4 mb-12">
        <SkeletonLoader className="w-24 h-4" />
        <SkeletonLoader className="w-4 h-4" />
        <SkeletonLoader className="w-32 h-4" />
        <SkeletonLoader className="w-4 h-4" />
        <SkeletonLoader className="w-20 h-4" />
      </div>
      <SkeletonLoader className="w-full h-[32rem] rounded-xl mb-6" />
      <div className="space-y-4">
        <SkeletonLoader className="w-full h-8" />
        <SkeletonLoader className="w-5/6 h-6" />
        <SkeletonLoader className="w-4/5 h-6" />
        <SkeletonLoader className="w-3/4 h-6" />
      </div>
    </div>
  );

  const renderRelatedPostsSkeleton = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden bg-white h-[300px] flex flex-col">
          <SkeletonLoader className="w-full h-32 rounded-t-2xl" />
          <div className="p-4 flex flex-col flex-grow">
            <SkeletonLoader className="w-3/4 h-6 mb-2" />
            <SkeletonLoader className="w-1/2 h-4 mb-2" />
            <SkeletonLoader className="w-16 h-4 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
        <p className="text-center mt-20 text-red-500" role="alert">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} lg:grid lg:grid-cols-[2fr_1fr] lg:gap-8`}>
        <div>{renderSkeleton()}</div>
        <div className="mt-12 lg:mt-0">
          <SkeletonLoader className="w-1/2 h-8 mb-4" />
          {renderRelatedPostsSkeleton()}
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} lg:grid lg:grid-cols-[2fr_1fr] lg:gap-8`}>
      {/* Main Content */}
      <div>
        {post?.title && (
          <Heading text={post.title} centered={false} className="max-w-3xl mb-6" />
        )}

        <div className="text-sm text-black mt-2 mb-8 space-y-2">
          {/* Row 1: Author and Date */}
          <div className="flex flex-wrap gap-2 items-center">
            {post?.author?.name && (
              <>
                <span className="font-bold">Written By:</span>
                <span>{post.author.name}</span>
              </>
            )}
            {post?.publishedAt && (
              <>
                <span className="hidden sm:inline">|</span>
                <span className="font-bold">Published On:</span>
                <span>{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}</span>
              </>
            )}
          </div>

          {/* Row 2: Reading Time and Categories */}
          <div className="flex flex-wrap gap-4 items-center">
            {post?.body && (
              <div className="flex items-center gap-1 text-black font-bold">
                <CiTimer className="text-lg" />
                <span>Reading Time:</span>
                <span>{calculateReadingTime(post.body)} minutes</span>
              </div>
            )}
            <span className="hidden sm:inline">|</span>

            {/* Categories */}
            {post?.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-black rounded-full text-sm font-bold text-black"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {post?.mainImage ? (
          <img
            src={urlFor(post.mainImage)
              .width(1200)
              .height(600)
              .auto('format')
              .fit('max')
              .url()}
            alt={post.mainImage.alt || post?.title || 'Blog image'}
            className="w-full h-[32rem] rounded-xl object-cover mb-8 shadow-xl"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-[32rem] bg-gray-200 rounded-xl mb-8 flex items-center justify-center">
            <p className="text-gray-500 font-medium">No image available</p>
          </div>
        )}

        {headings?.length > 0 && (
          <div className="mb-8 p-4 bg-gray-100 rounded-lg max-w-3xl">
            <Heading text="Table of Contents" size="text-2xl" fontWeight="font-semibold" className="mb-4" />
            <ul className="space-y-2">
              {headings.map(heading => (
                heading?.text && (
                  <li key={heading.id} className={`ml-${heading.level === 'h1' ? 0 : heading.level === 'h2' ? 4 : 8}`}>
                    <a
                      href={`#${heading.id}`}
                      className="text-black font-semibold hover:text-neon transition-colors text-sm md:text-base"
                    >
                      {heading.text}
                    </a>
                  </li>
                )
              ))}
            </ul>
          </div>
        )}

        {post?.body && (
          <div className="prose max-w-3xl mx-auto">
            <PortableText value={post.body} components={components} />
          </div>
        )}

        {post?.author && (
          <div className="mt-12 p-6 bg-gray-100 rounded-lg max-w-3xl">
            <Heading text="About the Author" size="text-2xl" fontWeight="font-semibold" className="mb-4" />
            <div className="flex items-center gap-4">
              {post.author?.image ? (
                <img
                  src={urlFor(post.author.image).width(80).height(80).url()}
                  alt={post.author.name || 'Author'}
                  className="w-20 h-20 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">{post.author?.name?.[0] || 'A'}</span>
                </div>
              )}
              <div>
                {post.author?.name && (
                  <BodyText text={post.author.name} size="text-lg" centered={false} fontWeight="font-semibold" />
                )}
                {post.author?.bio && (
                  <div className="prose text-sm text-gray-600">
                    <PortableText value={post.author.bio} components={components} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-4 max-w-3xl">
          <button
            onClick={shareOnTwitter}
            className="p-2 bg-neon text-white rounded-full hover:bg-black transition-colors"
            aria-label="Share on Twitter"
          >
            <FaTwitter size={20} />
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="p-2 bg-neon text-white rounded-full hover:bg-black transition-colors"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin size={20} />
          </button>
          <button
            onClick={copyLink}
            className="p-2 bg-neon text-white rounded-full hover:bg-black transition-colors"
            aria-label="Copy link"
          >
            <FaLink size={20} />
          </button>
        </div>
      </div>

      {/* More Blogs Sidebar */}
      <div className="mt-12 lg:mt-0">
        <Heading text="Related Blogs" size="text-2xl" fontWeight="font-semibold" className="mb-6" />
        {relatedPosts?.length > 0 ? (
          <div className="space-y-6">
            {relatedPosts.map(post => (
              post && <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No related posts available</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;