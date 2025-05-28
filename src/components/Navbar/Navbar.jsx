import { useState, useEffect } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import { theme } from '../../theme';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';
import { contactDetails } from '../MobileMenu/modules/contactDetails';
import Button from '../Button/Button';
import { navLinks } from './navLinks';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    <nav className={`w-full flex justify-center z-50 ${isSticky ? 'fixed top-0 backdrop-blur-sm ' : 'absolute'} transition-all duration-300 ${theme.layoutPages.paddingHorizontal} py-4`}>
      <div className="bg-white rounded-full px-6 py-4 flex items-center gap-6 shadow-lg max-w-[90vw] lg:max-w-[60vw] w-full justify-between">
        
        {/* Left links */}
        <div className="flex gap-6 items-center">
          {navLinks.slice(0, Math.floor(navLinks.length / 2)).map((link) => (
            <ScrollToTopLink
              key={link.to}
              to={link.to}
              className="text-black font-semibold text-sm hover:text-blue-400 transition"
            >
              {link.label}
            </ScrollToTopLink>
          ))}
        </div>

        {/* Logo */}
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

        {/* Right links + button */}
        <div className="flex gap-6 items-center">
          {navLinks.slice(Math.floor(navLinks.length / 2)).map((link) => (
            <ScrollToTopLink
              key={link.to}
              to={link.to}
              className="text-black font-semibold text-sm hover:text-blue-400 transition"
            >
              {link.label}
            </ScrollToTopLink>
          ))}

          {/* <Button
            name="Get a custom plan"
            fontSize="text-sm"
            className="bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-full shadow transition"
            openModal={true}
          /> */}
        </div>
      </div>

      {/* Mobile Button */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 lg:hidden">
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="relative hover:bg-blue-600/20 hover:rounded-full p-2 transition-all duration-300"
        >
          <img src="/hamburger.svg" alt="Menu" className="w-6 aspect-square z-[200]" loading="lazy" />
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
