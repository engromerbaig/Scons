import React, { useEffect, useState } from 'react';
import { getPosts } from '../../lib/sanityQueries';
import { theme } from '../../theme';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import BlogCard from './BlogCard';
import useBlogFilters from '../../hooks/useBlogFilters';

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
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="p-2 border rounded-lg"
          aria-label="Filter by category"
        >
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedAuthor}
          onChange={(e) => handleAuthorChange(e.target.value)}
          className="p-2 border rounded-lg"
          aria-label="Filter by author"
        >
          {uniqueAuthors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>

        <select
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="p-2 border rounded-lg"
          aria-label="Filter by date"
        >
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-lg"
          aria-label="Sort order"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>

        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Reset Filters
        </button>
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center mt-6">No posts available</p>
      )}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>

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