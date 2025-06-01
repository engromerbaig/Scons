import React, { useEffect, useRef, useState } from 'react';
import { getPosts } from '../../lib/sanityQueries';
import { theme } from '../../theme';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import BlogCard from './BlogCard';
import useBlogFilters from '../../hooks/useBlogFilters';
import FilterControls from '../OurWork/FilterControls';
import LoadMoreControls from '../OurWork/LoadMoreControls';

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const containerRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastAction, setLastAction] = useState(null); // Track last action ("loadMore" or "showLess")

  // Move useBlogFilters before useEffect
  const {
    selectedCategory,
    selectedAuthor,
    selectedDate,
    sortOrder,
    filteredPosts,
    uniqueCategories,
    uniqueAuthors,
    uniqueDates,
    handleCategoryChange,
    handleAuthorChange,
    handleDateChange,
    setSortOrder,
    resetFilters,
    postsToShow,
    showLoadMore,
    showShowLess,
    handleLoadMore,
    handleShowLess,
  } = useBlogFilters(posts);

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

  useEffect(() => {
    if ((postsToShow > 6 || lastAction === "showLess") && buttonContainerRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const buttonRect = buttonContainerRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollY = window.scrollY || window.pageYOffset;
          const buttonBottom = buttonRect.top + buttonRect.height + scrollY;

          // Scroll so the button container's bottom is at the viewport's bottom
          window.scrollTo({
            top: buttonBottom - viewportHeight + 20, // Small offset for padding
            behavior: "smooth",
          });
        });
      });
    }
  }, [postsToShow, lastAction]);

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  if (loading) {
    return <p className="text-center mt-20">Loading posts...</p>;
  }

  return (
    <div
      ref={containerRef}
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col items-center`}
    >
      <Heading text="Blogs & News" centered={false} />
      <BodyText text="Read our latest blog posts!" centered={false} />

      {/* Filter Controls */}
      <FilterControls
        selectedService={selectedCategory}
        selectedTechnology={selectedAuthor}
        selectedDate={selectedDate}
        sortOrder={sortOrder}
        uniqueServices={uniqueCategories}
        uniqueTechnologies={uniqueAuthors}
        uniqueDates={uniqueDates}
        handleServiceChange={handleCategoryChange}
        handleTechnologyChange={handleAuthorChange}
        handleDateChange={handleDateChange}
        setSortOrder={setSortOrder}
        resetFilters={resetFilters}
        isNestedService={false}
        isNestedTech={false}
        isPackages={false}
        isBlogs={true}
        isServices={false}
      />

      {filteredPosts.length === 0 && (
        <p className="text-center mt-6">No posts available</p>
      )}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 my-10">
        {filteredPosts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>

      {/* Load More Controls */}
      <LoadMoreControls
        showLoadMore={showLoadMore}
        showShowLess={showShowLess}
        handleLoadMore={() => {
          setLastAction("loadMore");
          handleLoadMore();
        }}
        handleShowLess={() => {
          setLastAction("showLess");
          handleShowLess();
        }}
        buttonContainerRef={buttonContainerRef}
      />
    </div>
  );
}