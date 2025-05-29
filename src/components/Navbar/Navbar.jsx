import { useState, useEffect } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import { theme } from '../../theme';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';
import { navLinks } from './navLinks';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full flex justify-center z-50 ${
        isSticky ? 'fixed top-0' : 'absolute'
      } transition-all duration-300 ${theme.layoutPages.paddingHorizontal} py-4`}
    >
      {/* Tube for lg and above */}
      <div
        className={`${
          isSticky ? 'backdrop-blur-sm' : ''
        } bg-transparent rounded-full px-10 py-4 shadow-xl max-w-[90vw] lg:max-w-[65vw] w-full hidden lg:flex relative items-center`}
      >
        {/* Left links */}
        <div className="flex justify-between items-center flex-1 pr-20">
          {navLinks.slice(0, Math.floor(navLinks.length / 2)).map((link) => {
            const isActive = currentPath === link.to;
            return (
              <ScrollToTopLink
                key={link.to}
                to={link.to}
                className={`font-bold rounded-full py-1 px-2 text-base transition-colors duration-300 ease-in-out ${
                  isActive
                    ? 'border border-neon text-neon'
                    : 'text-black hover:bg-neon/60'
                }`}
              >
                {link.label}
              </ScrollToTopLink>
            );
          })}
        </div>

        {/* Logo (Centered) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 shrink-0 z-10">
          <ScrollToTopLink to="/">
            <img
              src="/favicon.svg"
              alt="Logo"
              className="w-14  px-2 "
              loading="lazy"
            />
          </ScrollToTopLink>
        </div>

        {/* Right links */}
        <div className="flex justify-between items-center flex-1 pl-20">
          {navLinks.slice(Math.floor(navLinks.length / 2)).map((link) => {
            const isActive = currentPath === link.to;
            return (
              <ScrollToTopLink
                key={link.to}
                to={link.to}
                className={`font-bold rounded-full py-1 px-2 text-base transition-colors duration-300 ease-in-out ${
                  isActive
                    ? 'border border-neon text-neon'
                    : 'text-black hover:bg-neon/60'
                }`}
              >
                {link.label}
              </ScrollToTopLink>
            );
          })}
        </div>
      </div>

      {/* Mobile view: Logo and Hamburger */}
      <div className="flex justify-between items-center w-full lg:hidden">
        <div className="shrink-0">
          <ScrollToTopLink to="/">
            <img
              src="/logo2.svg"
              alt="Logo"
              className="w-20 aspect-rectangle"
              loading="lazy"
            />
          </ScrollToTopLink>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="hover:bg-blue-600/20 hover:rounded-full p-2 transition-all duration-300"
          >
            <img
              src="/hamburger.svg"
              alt="Menu"
              className="w-6 aspect-square z-[200]"
              loading="lazy"
            />
          </button>
        </div>
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
