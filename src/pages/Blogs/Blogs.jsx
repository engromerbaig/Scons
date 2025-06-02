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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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

  // Set up sticky detection
  useEffect(() => {
    if (loading || posts.length === 0) {
      console.log('⏳ Waiting for posts to load before setting up sticky');
      return;
    }

    console.log('=== STICKY SETUP START ===');
    console.log('filterBoxRef.current:', !!filterBoxRef.current);
    console.log('sentinelRef.current:', !!sentinelRef.current);
    console.log('containerRef.current:', !!containerRef.current);

    if (!filterBoxRef.current || !sentinelRef.current || !containerRef.current) {
      console.log('❌ Missing refs, aborting sticky setup');
      const timer = setTimeout(() => {
        console.log('🔄 Retrying sticky setup after delay');
        if (filterBoxRef.current && sentinelRef.current && containerRef.current) {
          setupSticky();
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    setupSticky();

    function setupSticky() {
      const sentinel = sentinelRef.current;
      const container = containerRef.current;
      const filterBox = filterBoxRef.current;

      console.log('✅ All refs available, setting up scroll listener');

      const handleScroll = () => {
        const scrollY = window.scrollY;
        const sentinelRect = sentinel.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const filterBoxHeight = filterBox.getBoundingClientRect().height;

        // Calculate container bottom relative to document
        const containerBottom = containerRect.top + scrollY + containerRect.height;

        console.log(
          `📜 SCROLL: scrollY=${scrollY}, sentinelTop=${sentinelRect.top}, ` +
          `containerBottom=${containerBottom}, filterBoxHeight=${filterBoxHeight}, windowWidth=${windowWidth}`
        );

        if (windowWidth < 1280) {
          console.log('📱 Mobile view, skipping sticky');
          if (isSticky) {
            setIsSticky(false);
          }
          return;
        }

        // Check if filter box should be sticky
        const shouldBeSticky =
          sentinelRect.top <= 50 && // Top boundary: sentinel is near top
          containerBottom > scrollY + filterBoxHeight + 50; // Bottom boundary: container bottom is below filter box

        console.log(`🎯 STICKY CHECK: shouldBeSticky=${shouldBeSticky}, currentIsSticky=${isSticky}`);

        if (shouldBeSticky !== isSticky) {
          console.log(`🔄 CHANGING STICKY STATE: ${isSticky} -> ${shouldBeSticky}`);
          setIsSticky(shouldBeSticky);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      console.log('🏁 Running initial scroll check');
      handleScroll();

      return () => {
        console.log('🧹 Cleaning up scroll listener');
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isSticky, loading, posts.length]);

  // Debug sticky state changes
  useEffect(() => {
    console.log('Sticky state updated:', isSticky);
  }, [isSticky]);

  // Scroll to bottom after load more/show less
  useEffect(() => {
    if ((postsToShow > 6 || lastAction === 'showLess') && buttonContainerRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const buttonRect = buttonContainerRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollY = window.scrollY || window.pageYOffset;
          const buttonBottom = buttonRect.top + buttonRect.height + scrollY;

          window.scrollTo({
            top: buttonBottom - viewportHeight + 20,
            behavior: 'smooth',
          });
        });
      });
    }
  }, [postsToShow, lastAction]);

  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (loading) return <p className="text-center mt-20">Loading posts...</p>;

  return (
    <div
      ref={containerRef}
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} `}
    >
      <Heading text="Blogs & News" centered={false} />
      <BodyText text="Read our latest blog posts!" centered={false} />

      {/* Mobile Filter Toggle */}
      <div className="xl:hidden flex justify-between items-center my-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-neon text-white rounded-md"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <FaFilter /> {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Sentinel */}
      <div
        ref={sentinelRef}
        className="h-[20px] xl:block hidden opacity-50 relative z-10"
        style={{ marginBottom: '10px' }}
      >
      </div>

      {/* Layout */}
      <div className="flex flex-col py-10 xl:grid xl:grid-cols-[30%_70%] gap-8">
        {/* Filters Box for XL and above */}
        <div className={`${isFiltersOpen ? 'block' : 'hidden'} xl:block w-full xl:w-[340px]`}>
          <div
            ref={filterBoxRef}
            className={`bg-white border border-gray-200  flex flex-col justify-center items-center rounded-lg px-6 py-8 transition-all duration-300 ease-in-out
              ${isSticky
                ? 'xl:fixed xl:top-10 xl:z-20 xl:w-[340px]'
                : 'xl:relative xl:w-[340px]'
              }`}
          >
            <div className="w-[300px]">
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
          </div>
        </div>

        {/* Blog Cards Section */}
        <div className="xl:w-full">
          {filteredPosts.length === 0 && (
            <p className="text-center mt-6">No posts available</p>
          )}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2 mb-10">
            {filteredPosts.slice(0, postsToShow).map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>

          <LoadMoreControls
            showLoadMore={showLoadMore}
            showShowLess={showShowLess}
            handleLoadMore={() => {
              setLastAction('loadMore');
              handleLoadMore();
            }}
            handleShowLess={() => {
              setLastAction('showLess');
              handleShowLess();
            }}
            buttonContainerRef={buttonContainerRef}
          />
        </div>
      </div>
    </div>
  );
}