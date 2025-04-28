import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const ScrollToTopLink = ({ to, children, className, ...props }) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    // Comprehensive scrolling methods
    try {
      // Method 1: Scroll to top with behavior
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });

      // Method 2: Direct scroll assignments
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      // Backup method using scroll element
      const scrollingElement = document.scrollingElement || document.documentElement;
      if (scrollingElement) {
        scrollingElement.scrollTop = 0;
      }
    } catch (error) {
      console.error('Scroll to top failed:', error);
    }
  };

  const handleClick = (e) => {
    // Prevent default to ensure clean navigation
    e.preventDefault();
    
    // Scroll to top first
    scrollToTop();

    // Then navigate
    navigate(to);
  };

  // Additional insurance with useEffect
  useEffect(() => {
    scrollToTop();
  }, [to]);

  return (
    <Link 
      to={to} 
      className={className} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ScrollToTopLink;