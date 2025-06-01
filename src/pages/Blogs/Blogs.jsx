import React, { useEffect, useRef, useState } from 'react';
import { getPosts } from '../../lib/sanityQueries';
import { theme } from '../../theme';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import BlogCard from './BlogCard';
import useBlogFilters from '../../hooks/useBlogFilters';
import FilterControls from '../OurWork/FilterControls';
import LoadMoreControls from '../OurWork/LoadMoreControls';
import { FaFilter } from 'react-icons/fa';

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const containerRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const filterBoxRef = useRef(null);
  const sentinelRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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

  // Fetch posts
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

  // Intersection Observer for sticky filter box
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting); // Sticky when sentinel is out of view
      },
      { threshold: 0, rootMargin: '0px' }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  // Load More/Show Less scrolling
  useEffect(() => {
    if ((postsToShow > 6 || lastAction === "showLess") && buttonContainerRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const buttonRect = buttonContainerRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollY = window.scrollY || window.pageYOffset;
          const buttonBottom = buttonRect.top + buttonRect.height + scrollY;

          window.scrollTo({
            top: buttonBottom - viewportHeight + 20,
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
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
    >
      <Heading text="Blogs & News" centered={false} />
      <BodyText text="Read our latest blog posts!" centered={false} />

      {/* Mobile: Toggle Button for Filters */}
      <div className="xl:hidden flex justify-between items-center my-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <FaFilter /> {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Sentinel for Intersection Observer */}
      <div ref={sentinelRef} className="h-1"></div>

      {/* Main Layout */}
      <div className="flex flex-col py-10 xl:grid xl:grid-cols-[30%_70%] gap-8">
        {/* Filters: Sticky for xl, Collapsible for smaller screens */}
        <div
          ref={filterBoxRef}
          className={`${
            isFiltersOpen ? 'block' : 'hidden'
          } xl:block w-full xl:h-96  bg-white border border-gray-200 rounded-lg shadow-md p-6 xl:sticky xl:top-4 ${
            isSticky ? 'shadow-lg' : ''
          }`}
        >
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
        </div>

        {/* Blog Cards */}
        <div className=" xl:w-full">
          {filteredPosts.length === 0 && (
            <p className="text-center mt-6">No posts available</p>
          )}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2 mb-10">
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
      </div>
    </div>
  );
}