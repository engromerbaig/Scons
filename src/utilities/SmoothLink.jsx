// SmoothLink.js
import React from 'react';
import { Link } from 'react-router-dom';

const SmoothLink = React.forwardRef(({ to, children, ...props }, ref) => (
  <Link
    to={to}
    ref={ref}
    {...props}
    onClick={(e) => {
      const target = document.querySelector(to);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', to);
      }
    }}
  >
    {children}
  </Link>
));

export default SmoothLink;
