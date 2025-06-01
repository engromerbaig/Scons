import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    showLoadMore,
    showShowLess,
    handleLoadMore,
    handleShowLess,
  } = useBlogFilters(posts);

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  if (loading) {
    return <p className="text-center mt-20">Loading posts...</p>;
  }

  return (
    <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>


        {/* <LoadMoreControls
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
        /> */}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-6">
        {showLoadMore && (
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Load More
          </button>
        )}
        {showShowLess && (
          <button
            onClick={handleShowLess}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}