import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Import Helmet
import { getPosts } from "../../lib/sanityQueries";
import { theme } from "../../theme";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import BlogCard from "./BlogCard";
import useBlogFilters from "../../hooks/useBlogFilters";
import FilterControls from "../OurWork/FilterControls";
import LoadMoreControls from "../OurWork/LoadMoreControls";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeWrapper from "../../utilities/Animations/FadeWrapper";
import InnerHero from "../../components/InnerHero/InnerHero";
import SkeletonLoader from "../../utilities/SkeletonLoader";
import ogLogo from "../../assets/images/og-default.jpg"; // Logo-based OG image
import schema from '../../utilities/schema';
import StartProjectBelt from "../../components/StartProjectBelt/StartProjectBelt";

gsap.registerPlugin(ScrollTrigger);

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const containerRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const filterBoxRef = useRef(null);
  const filterPlaceholderRef = useRef(null);
  const sentinelRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const [filterBoxDimensions, setFilterBoxDimensions] = useState({ width: 340, height: 0 });

  const {
    selectedCategory,
    selectedAuthor,
    selectedDate,
    sortOrder,
    filteredPosts,
    uniqueCategories,
    uniqueAuthors,
    uniqueDates,
    validCategories,
    validAuthors,
    validDates,
    isCategoryClickable,
    isAuthorClickable,
    isDateClickable,
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

  // Fetch posts from Sanity
  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        if (mounted) {
          setPosts(data || []);
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

  // Handle filter box dimensions for sticky behavior
  useEffect(() => {
    if (filterBoxRef.current && !loading) {
      const updateDimensions = () => {
        const rect = filterBoxRef.current.getBoundingClientRect();
        setFilterBoxDimensions({
          width: rect.width,
          height: rect.height,
        });
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(filterBoxRef.current);

      return () => {
        window.removeEventListener("resize", updateDimensions);
        resizeObserver.disconnect();
      };
    }
  }, [loading, selectedCategory, selectedAuthor, selectedDate, filteredPosts.length]);

  // Sticky filter logic
  useEffect(() => {
    if (loading || posts.length === 0) {
      return;
    }

    if (!filterBoxRef.current || !sentinelRef.current || !containerRef.current) {
      const timer = setTimeout(() => {
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

      const handleScroll = () => {
        const scrollY = window.scrollY;
        const sentinelRect = sentinel.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        const containerBottom = containerRect.top + scrollY + containerRect.height;
        if (windowWidth < 1280) {
          if (isSticky) {
            setIsSticky(false);
          }
          return;
        }

        const shouldBeSticky =
          sentinelRect.top <= 50 && containerBottom > scrollY + filterBoxDimensions.height + 100;

        if (shouldBeSticky !== isSticky) {
          setIsSticky(shouldBeSticky);
        }
      };

      let ticking = false;
      const throttledScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", throttledScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener("scroll", throttledScroll);
      };
    }
  }, [isSticky, loading, posts.length, filterBoxDimensions.height]);

  // Scroll to button container after load more/show less
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

  // Render skeleton cards during loading
  const renderSkeletonCards = () => (
    <FadeWrapper className="grid gap-8 md:grid-cols-2 xl:grid-cols-2 mb-10">
      {[...Array(6)].map((_, index) => (
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

  // Meta description (trim to 160 characters)
  const metaDescription =
    "Explore Scons Tech' latest blog posts, insights, and tech updates for startups and enterprises.".substring(0, 160);

  // Keywords
  const keywords = [
    "Scons Tech",
    "blogs",
    "tech news",
    "software development",
    "UK tech",
    "insights",
    "updates",
  ].join(", ");

  if (error) {
    return (
      <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingBottom}`}>
        <Helmet>
          <title>Blogs | Scons Tech</title>
          <meta name="description" content={metaDescription} />
          <meta name="keywords" content={keywords} />
          <link rel="canonical" href="https://sconstech.com/blogs" />
          <meta property="og:title" content="Blogs | Scons Tech" />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://sconstech.com/blogs" />
          <meta property="og:image" content={ogLogo} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Scons Tech logo" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Blogs | Scons Tech" />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:image" content={ogLogo} />
                <script type="application/ld+json">{schema}</script>

        </Helmet>
        <InnerHero
          headingText="Blogs & News"
          spanText="News"
          bodyText="Explore the latest insights, updates, and stories from Scons Tech. Stay informed with our expert articles and company news!"
          height="h-[70vh]"
        />
        <p className="text-center mt-20 text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Blogs | Scons Tech</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href="https://sconstech.com/blogs" />
        <meta property="og:title" content="Blogs | Scons Tech" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sconstech.com/blogs" />
        <meta property="og:image" content={ogLogo} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Scons Tech logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blogs | Scons Tech" />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogLogo} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Scons Tech Blogs",
            "description": metaDescription,
            "url": "https://sconstech.com/blogs",
            "image": ogLogo,
            "publisher": {
              "@type": "Organization",
              "name": "Scons Tech",
              "url": "https://sconstech.com",
            },
          })}
        </script>
      </Helmet>

      <InnerHero
        headingText="Blogs & News"
        spanText="News"
        bodyText="Explore the latest insights, updates, and stories from Scons Tech. Stay informed with our expert articles and company news!"
        height="h-[70vh]"
      />

      <div ref={containerRef} className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingBottom}`}>
        <div ref={sentinelRef} className="h-[20px] xl:block hidden opacity-0 pointer-events-none" style={{ marginBottom: "10px" }} />

        <div className="flex flex-col py-10 xl:grid xl:grid-cols-[30%_70%] gap-8">
          <div className="w-full xl:w-[340px]">
            <div
              ref={filterPlaceholderRef}
              className="hidden xl:block"
              style={{
                height: isSticky ? `${filterBoxDimensions.height}px` : "0px",
                width: isSticky ? `${filterBoxDimensions.width}px` : "auto",
              }}
            />
            <div
              ref={filterBoxRef}
              className={`
                xl:bg-white xl:border xl:border-gray-200 xl:shadow-3xl xl:rounded-lg xl:px-2 xl:py-8
                ${isSticky ? "xl:fixed xl:top-[60px] xl:z-20" : "xl:relative"}
              `}
              style={{
                width: isSticky ? `${filterBoxDimensions.width}px` : "100%",
                maxWidth: "340px",
              }}
            >
              <div className="w-full xl:w-[300px] xl:mx-auto">
                <FilterControls
                  selectedService={selectedCategory}
                  selectedTechnology={selectedAuthor}
                  selectedDate={selectedDate}
                  sortOrder={sortOrder}
                  uniqueServices={uniqueCategories}
                  uniqueTechnologies={uniqueAuthors}
                  uniqueDates={uniqueDates}
                  validServices={validCategories}
                  validTechnologies={validAuthors}
                  validDates={validDates}
                  isServiceClickable={isCategoryClickable}
                  isTechnologyClickable={isAuthorClickable}
                  isDateClickable={isDateClickable}
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

          <div className="xl:w-full">
            {loading ? (
              renderSkeletonCards()
            ) : filteredPosts.length === 0 ? (
              <p className="text-center mt-6">No posts available</p>
            ) : (
              <FadeWrapper key={lastAction} className="grid gap-8 md:grid-cols-2 xl:grid-cols-2 mb-10">
                {filteredPosts.slice(0, postsToShow).map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </FadeWrapper>
            )}

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


         <StartProjectBelt
                headingText="Enjoy Reading Our Blogs?"
                text="Blogs"
           isNews={true}
              />
    </div>
  );
}