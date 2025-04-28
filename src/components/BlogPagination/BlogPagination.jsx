import React, { useState, useEffect, useRef } from "react";
import blogs from "../../data/blogs";
import BlogCard from "../BlogCard/BlogCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import gsap from "gsap";
import { theme } from "../../theme";

const BlogPagination = () => {
  const blogsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const sectionRef = useRef(null);

  // Sort blogs by most recent date
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Get current page's blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // GSAP Animation on page change
  const contentRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
    
    // Scroll to top of section when page changes
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div 
      ref={sectionRef}
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
    >
    <div 
  ref={contentRef} 
  className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10"
>
  {currentBlogs.map((blog, index) => (
    <div 
      key={blog.id}
      className={`
        mx-auto lg:mx-0  // Center on mobile, no margin on desktop
        ${index % 2 === 0 ? "lg:justify-self-start" : "lg:justify-self-end"}
         // Optional: Control card width
      `}
    >
      <BlogCard blog={blog} />
    </div>
  ))}
</div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center space-x-2 sm:space-x-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full transition-colors ${
              currentPage === 1 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:bg-gray-200"
            }`}
            aria-label="Previous page"
          >
            <FaChevronLeft className="text-neon text-35px" />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            // Show first, last, and pages around current page
            if (
              page === 1 || 
              page === totalPages || 
              Math.abs(page - currentPage) <= 1
            ) {
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    currentPage === page 
                      ? "text-neon  text-35px font-bold" 
                      : "text-black text-35px font-semibold hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            }
            // Show ellipsis at the right places
            return (i === 1 && currentPage > 3) || 
                   (i === totalPages - 2 && currentPage < totalPages - 2) ? (
              <span key={i} className="px-1">...</span>
            ) : null;
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full transition-colors ${
              currentPage === totalPages 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:bg-gray-200"
            }`}
            aria-label="Next page"
          >
            <FaChevronRight className="text-neon text-35px" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPagination;