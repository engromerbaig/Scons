import { useState, useMemo } from "react";
import { format } from "date-fns";

const useBlogFilters = (posts) => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedAuthor, setSelectedAuthor] = useState("All Authors");
  const [selectedDate, setSelectedDate] = useState("All Dates");
  const [sortOrder, setSortOrder] = useState("desc");
  const [postsToShow, setPostsToShow] = useState(6);
  const postsPerLoad = 2;

  // Normalize categories
  const uniqueCategories = useMemo(
    () => [
      "All Categories",
      ...new Set(
        posts
          .flatMap((p) =>
            Array.isArray(p.categories)
              ? p.categories.map((c) => c.title || c)
              : [p.categories?.title || p.categories]
          )
          .filter(Boolean)
      ),
    ],
    [posts]
  );

  // Normalize authors
  const uniqueAuthors = useMemo(
    () => [
      "All Authors",
      ...new Set(posts.map((p) => p.author?.name || p.author || "Anonymous").filter(Boolean)),
    ],
    [posts]
  );

  // Normalize dates
  const uniqueDates = useMemo(
    () => [
      "All Dates",
      ...new Set(
        posts
          .map((p) => (p.publishedAt ? format(new Date(p.publishedAt), "MMMM yyyy") : null))
          .filter(Boolean)
          .sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
          })
      ),
    ],
    [posts, sortOrder]
  );

  // Compute valid categories based on selected author and date
  const validCategories = useMemo(() => {
    if (selectedAuthor === "All Authors" && selectedDate === "All Dates") {
      return uniqueCategories;
    }
    const relevantPosts = posts.filter((p) => {
      const authorName = p.author?.name || p.author || "Anonymous";
      const postDate = p.publishedAt ? format(new Date(p.publishedAt), "MMMM yyyy") : null;
      const matchesAuthor = selectedAuthor === "All Authors" || authorName === selectedAuthor;
      const matchesDate = selectedDate === "All Dates" || postDate === selectedDate;
      return matchesAuthor && matchesDate;
    });
    return [
      "All Categories",
      ...new Set(
        relevantPosts
          .flatMap((p) =>
            Array.isArray(p.categories)
              ? p.categories.map((c) => c.title || c)
              : [p.categories?.title || p.categories]
          )
          .filter(Boolean)
      ),
    ];
  }, [selectedAuthor, selectedDate, uniqueCategories, posts]);

  // Compute valid authors based on selected category and date
  const validAuthors = useMemo(() => {
    if (selectedCategory === "All Categories" && selectedDate === "All Dates") {
      return uniqueAuthors;
    }
    const relevantPosts = posts.filter((p) => {
      const categoryArray = Array.isArray(p.categories)
        ? p.categories.map((c) => c.title || c)
        : [p.categories?.title || p.categories];
      const postDate = p.publishedAt ? format(new Date(p.publishedAt), "MMMM yyyy") : null;
      const matchesCategory = selectedCategory === "All Categories" || categoryArray.includes(selectedCategory);
      const matchesDate = selectedDate === "All Dates" || postDate === selectedDate;
      return matchesCategory && matchesDate;
    });
    return [
      "All Authors",
      ...new Set(relevantPosts.map((p) => p.author?.name || p.author || "Anonymous").filter(Boolean)),
    ];
  }, [selectedCategory, selectedDate, uniqueAuthors, posts]);

  // Compute valid dates based on selected category and author
  const validDates = useMemo(() => {
    if (selectedCategory === "All Categories" && selectedAuthor === "All Authors") {
      return uniqueDates;
    }
    const relevantPosts = posts.filter((p) => {
      const categoryArray = Array.isArray(p.categories)
        ? p.categories.map((c) => c.title || c)
        : [p.categories?.title || p.categories];
      const authorName = p.author?.name || p.author || "Anonymous";
      const matchesCategory = selectedCategory === "All Categories" || categoryArray.includes(selectedCategory);
      const matchesAuthor = selectedAuthor === "All Authors" || authorName === selectedAuthor;
      return matchesCategory && matchesAuthor;
    });
    return [
      "All Dates",
      ...new Set(
        relevantPosts
          .map((p) => (p.publishedAt ? format(new Date(p.publishedAt), "MMMM yyyy") : null))
          .filter(Boolean)
          .sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
          })
      ),
    ];
  }, [selectedCategory, selectedAuthor, uniqueDates, posts, sortOrder]);

  const isCategoryClickable = (category) => validCategories.includes(category);
  const isAuthorClickable = (author) => validAuthors.includes(author);
  const isDateClickable = (date) => validDates.includes(date);

  const handleCategoryChange = (category) => {
    if (isCategoryClickable(category)) {
      setSelectedCategory(category);
      setPostsToShow(6);
      // Reset author and date if not valid
      if (category !== "All Categories") {
        if (!validAuthors.includes(selectedAuthor)) setSelectedAuthor("All Authors");
        if (!validDates.includes(selectedDate)) setSelectedDate("All Dates");
      }
    }
  };

  const handleAuthorChange = (author) => {
    if (isAuthorClickable(author)) {
      setSelectedAuthor(author);
      setPostsToShow(6);
      // Reset category and date if not valid
      if (author !== "All Authors") {
        if (!validCategories.includes(selectedCategory)) setSelectedCategory("All Categories");
        if (!validDates.includes(selectedDate)) setSelectedDate("All Dates");
      }
    }
  };

  const handleDateChange = (date) => {
    if (isDateClickable(date)) {
      setSelectedDate(date);
      setPostsToShow(6);
      // Reset category and author if not valid
      if (date !== "All Dates") {
        if (!validCategories.includes(selectedCategory)) setSelectedCategory("All Categories");
        if (!validAuthors.includes(selectedAuthor)) setSelectedAuthor("All Authors");
      }
    }
  };

  // Filtering logic
  const allFilteredPosts = posts
    .filter((p) => {
      const categoryArray = Array.isArray(p.categories)
        ? p.categories.map((c) => c.title || c)
        : [p.categories?.title || p.categories];
      const matchesCategory = selectedCategory === "All Categories" || categoryArray.includes(selectedCategory);
      const authorName = p.author?.name || p.author || "Anonymous";
      const matchesAuthor = selectedAuthor === "All Authors" || authorName === selectedAuthor;
      const postDate = p.publishedAt ? format(new Date(p.publishedAt), "MMMM yyyy") : null;
      const matchesDate = selectedDate === "All Dates" || postDate === selectedDate;
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

  const filteredPosts = allFilteredPosts.slice(0, postsToShow);

  const handleLoadMore = () => {
    setPostsToShow((prev) => prev + postsPerLoad);
  };

  const handleShowLess = () => {
    setPostsToShow((prev) => Math.max(6, prev - postsPerLoad));
  };

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
    totalPosts: allFilteredPosts.length,
    showLoadMore: postsToShow < allFilteredPosts.length,
    showShowLess: postsToShow > 6,
    handleLoadMore,
    handleShowLess,
  };
};

export default useBlogFilters;