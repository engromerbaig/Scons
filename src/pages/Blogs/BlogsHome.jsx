import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import AnimatedArrow from "../../components/AnimatedArrow/AnimatedArrow";
import BlogCard from "./BlogCard";
import { getPosts } from "../../lib/sanityQueries";
import SkeletonLoader from "../../utilities/SkeletonLoader";
import FadeWrapper from "../../utilities/Animations/FadeWrapper";

const BlogsHome = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from Sanity
  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        if (mounted) {
          // Sort posts by publishedAt date in descending order and take the latest 3
          const sortedPosts = (data || []).sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          ).slice(0, 3);
          setPosts(sortedPosts);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError("Failed to load posts. Please try again later.");
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  // Render skeleton cards during loading
  const renderSkeletonCards = () => (
    <FadeWrapper className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-2xl overflow-hidden bg-white h-[450px] flex flex-col"
        >
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
      ))}
    </FadeWrapper>
  );

  return (
    <div
      className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}
    >
      <div className="flex flex-col xl:flex-row xl:justify-between justify-start items-start xl:items-center w-full gap-y-4 mb-12 xl:mb-20">
        <Heading
          text="Read Our Latest Blogs"
          spanText="Blogs"
          centered={false}
          spanColor="text-neon"
          className="text-left"
          showUnderline
        />
        <AnimatedArrow
          text="More Blogs"
          to="/blogs"
          className="text-left self-auto xl:self-auto"
        />
      </div>

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : loading ? (
        renderSkeletonCards()
      ) : posts.length === 0 ? (
        <p className="text-center">No posts available</p>
      ) : (
        <FadeWrapper className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </FadeWrapper>
      )}
    </div>
  );
};

export default BlogsHome;