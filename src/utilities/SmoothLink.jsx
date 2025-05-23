import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SmoothLink = ({ to, children, className, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (to.startsWith('#')) {
      // It's an in-page anchor link
      e.preventDefault();
      const id = to.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (to.startsWith('/')) {
      // Normal route navigation with react-router
      // Prevent default and programmatically navigate
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default SmoothLink;
