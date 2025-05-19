import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TopScroller = ({ dependencies = [], onScroll = () => {} }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    onScroll(); // for extra actions like setImageLoaded(false)
  }, [location.pathname, ...dependencies]);

  return null;
};

export default TopScroller;
