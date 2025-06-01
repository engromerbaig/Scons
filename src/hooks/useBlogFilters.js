import { useState } from "react";
import { format } from "date-fns";

const useBlogFilters = (posts) => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedAuthor, setSelectedAuthor] = useState("All Authors");
  const [selectedDate, setSelectedDate] = useState("All Dates");
  const [sortOrder, setSortOrder] = useState("desc");
  const [postsToShow, setPostsToShow] = useState(6);
  const postsPerLoad = 3;

  // Normalize categories (handle array or single string)
  const uniqueCategories = [
    "All Categories",
    ...new Set(
      posts.flatMap((p) =>
        Array.isArray(p.categories)
          ? p.categories.map((c) => c.title || c)
          : [p.categories?.title || p.categories]
      ).filter(Boolean)
    ),
  ];

  // Normalize authors
  const uniqueAuthors = [
    "All Authors",
    ...new Set(
      posts.map((p) => p.author?.name || p.author || "Anonymous").filter(Boolean)
    ),
  ];

  // Create unique month-year options from publishedAt
  const uniqueDates = [
    "All Dates",
    ...new Set(
      posts
        .map((p) =>
          p.publishedAt
            ? format(new Date(p.publishedAt), "MMMM yyyy")
            : null
        )
        .filter(Boolean)
        .sort((a, b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        })
    ),
  ];

  // Handlers for filter changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPostsToShow(6); // Reset pagination on filter change
  };

  const handleAuthorChange = (author) => {
    setSelectedAuthor(author);
    setPostsToShow(6);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPostsToShow(6);
  };

  // Filtering logic
  const allFilteredPosts = posts
    .filter((p) => {
      // Category filter
      const categoryArray = Array.isArray(p.categories)
        ? p.categories.map((c) => c.title || c)
        : [p.categories?.title || p.categories];
      const matchesCategory =
        selectedCategory === "All Categories" ||
        categoryArray.includes(selectedCategory);

      // Author filter
      const authorName = p.author?.name || p.author || "Anonymous";
      const matchesAuthor =
        selectedAuthor === "All Authors" || authorName === selectedAuthor;

      // Date filter
      const postDate = p.publishedAt
        ? format(new Date(p.publishedAt), "MMMM yyyy")
        : null;
      const matchesDate =
        selectedDate === "All Dates" || postDate === selectedDate;

      return matchesCategory && matchesAuthor && matchesDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0);
      const dateB = new Date(b.publishedAt || 0);
      if (sortOrder === "desc") {
        return dateB - dateA || a.title.localeCompare(b.title);
      } else {
        return dateA - dateB || a.title.localeCompare(b.title);
      }
    });

  // Paginated posts
  const filteredPosts = allFilteredPosts.slice(0, postsToShow);

  // Pagination handlers
  const handleLoadMore = () => {
    setPostsToShow((prev) => prev + postsPerLoad);
  };

  const handleShowLess = () => {
    setPostsToShow((prev) => Math.max(6, prev - postsPerLoad));
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedAuthor("All Authors");
    setSelectedDate("All Dates");
    setSortOrder("desc");
    setPostsToShow(6);
  };

  return {
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
    totalPosts: allFilteredPosts.length,
    showLoadMore: postsToShow < allFilteredPosts.length,
    showShowLess: postsToShow > 6,
    handleLoadMore,
    handleShowLess,
  };
};

export default useBlogFilters;