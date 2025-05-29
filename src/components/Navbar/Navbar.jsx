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

  const phoneDetail = contactDetails.find(detail => detail.type === 'Phone');
  const PhoneIcon = phoneDetail?.icon;

  return (
    <nav
      className={`${
        isSticky ? 'fixed top-0  backdrop-blur-[2px] ' : 'absolute bg-transparent'
      } ${theme.layoutPages.paddingHorizontal}  w-full z-[50] transition-all duration-300`}
    >
  <div className="grid grid-cols-3 items-end w-full h-20">
  {/* Left Column - Logo */}
  <div className="flex items-center justify-start h-20">
    <ScrollToTopLink to="/" className="cursor-pointer flex items-center justify-center h-20 w-20 rounded-b-xl bg-black">
      <img src="/favicon.svg" alt="Logo" className="w-10 aspect-square" loading="lazy" />
    </ScrollToTopLink>
  </div>

  {/* Center Column - Navigation Links */}
  <div className="flex items-end justify-center h-20">
    <div className="hidden lg:flex items-center justify-between gap-8 bg-black px-12 py-4 rounded-xl min-w-[750px]">
      {navLinks.map((link, index) => (
        <ScrollToTopLink
          key={index}
          to={link.to}
          className="text-base font-medium text-white hover:text-neon transition-colors whitespace-nowrap"
        >
          {link.label}
        </ScrollToTopLink>
      ))}
    </div>
  </div>

  {/* Right Column - CTA and Hamburger */}
  <div className="flex items-center justify-end gap-4 h-20">
    <div className="lg:hidden">
      <Button
        name="Get in Touch"
        fontSize="text-10px"
        className="py-1 px-1"
        openModal={true}
      />
    </div>

    <button
      type="button"
      onClick={toggleMobileMenu}
      className="relative bg-black p-2 transition-all duration-300 h-20 w-20 rounded-b-xl flex items-center justify-center"
    >
      <div className="flex flex-col items-end gap-2">
        <div className="w-4 h-0.5 bg-white rounded-sm"></div>
        <div className="w-6 h-0.5 bg-white rounded-sm"></div>
      </div>
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