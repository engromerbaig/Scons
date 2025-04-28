import { useState, useEffect } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import { theme } from '../../theme';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // Track sticky state
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position

  const toggleMobileMenu = (e) => {
    e.preventDefault(); // Prevent default behavior of the button
    e.stopPropagation(); // Prevent event bubbling

    if (isMobileMenuOpen) {
      setClosing(true); // Trigger exit animations first
    } else {
      setMobileMenuOpen(true);
    }
  };

  const handleCloseComplete = () => {
    setMobileMenuOpen(false); // Fully close the menu after animation
    setClosing(false); // Reset closing state
  };

  // Track scroll direction and make navbar sticky only when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY && currentScrollY > 50) {
        setIsSticky(true); // Make sticky when scrolling up and scrolled down enough
        } else {
        setIsSticky(false); // Non-sticky when scrolling down
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
      className={`${isSticky ? 'fixed top-0 bg-opacity-60 backdrop-blur-[2px]' : 'absolute bg-transparent'} ${theme.layoutPages.paddingHorizontal} pt-6 lg:pt-10 flex justify-between items-center w-full z-[101] transition-all duration-300`}
    >
      <div className="flex items-center">
        <ScrollToTopLink to="/" className="cursor-pointer">
          <img src="/logo.svg" alt="Logo" className="lg:w-36 w-28 aspect-rectangle" />
        </ScrollToTopLink>
      </div>
      <div className="flex items-center">
        <button type="button" onClick={toggleMobileMenu} className="relative">
          <img src="/hamburger.svg" alt="Menu" className="w-6 aspect-square lg:w-8 z-[200]" />
        </button>
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpen && !closing}
        onClose={() => setClosing(true)} // Start closing animation
        onCloseComplete={handleCloseComplete} // Fully close after animation
      />
    </nav>
  );
};

export default Navbar;