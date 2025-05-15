import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import MobileMenu from '../MobileMenu/MobileMenu';
import { theme } from '../../theme';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation(); // Get current location

  // Check if the current route is a service inner page
  const isServicePage = location.pathname.startsWith('/service/');

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMobileMenuOpen) {
      setClosing(true);
    } else {
      setMobileMenuOpen(true);
    }
  };

  const handleCloseComplete = () => {
    setMobileMenuOpen(false);
    setClosing(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY && currentScrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`${isSticky ? 'fixed top-0 bg-opacity-60 backdrop-blur-[2px]' : 'absolute bg-transparent'} ${
        theme.layoutPages.paddingHorizontal
      } pt-6 lg:pt-8 flex justify-between items-center w-full z-[101] transition-all duration-300`}
    >
      <div className="flex items-center">
        <ScrollToTopLink to="/" className="cursor-pointer">
          <img src="/logo2.svg" alt="Logo" className="lg:w-28 w-20 aspect-rectangle" loading='lazy' />
        </ScrollToTopLink>
      </div>
      <div className="flex items-center">
        <button type="button" onClick={toggleMobileMenu} className="relative">
          <img
            src="/hamburger.svg"
            alt="Menu"
            className={`w-6 aspect-square lg:w-6 z-[200] ${isServicePage ? 'svg-black' : 'svg-black'}`}
            loading='lazy'
          />
        </button>
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpen && !closing}
        onClose={() => setClosing(true)}
        onCloseComplete={handleCloseComplete}
      />
    </nav>
  );
};

export default Navbar;