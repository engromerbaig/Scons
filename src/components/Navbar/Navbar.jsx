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
        isSticky ? 'fixed top-0 bg-opacity-60 backdrop-blur-sm shadow-md' : 'absolute bg-transparent'
      } ${theme.layoutPages.paddingHorizontal}  w-full z-[50] transition-all duration-300`}
    >
      <div className="grid grid-cols-3 items-start w-full">
        {/* Left Column - Logo */}
        <div className="flex items-center justify-start">
          <ScrollToTopLink to="/" className="cursor-pointer bg-black">
            <img src="/favicon.svg" alt="Logo" className="lg:w-14 w-12 aspect-rectangle" loading="lazy" />
          </ScrollToTopLink>
        </div>

        {/* Center Column - Navigation Links */}
        <div className="flex items-center justify-center mt-2 lg:mt-2">
          <div className="hidden lg:flex items-center gap-8 bg-black px-10 py-3 rounded-2xl">
            {navLinks.map((link, index) => (
              <ScrollToTopLink 
                key={index}
                to={link.to} 
                className="text-base font-medium text-white hover:text-neon transition-colors"
              >
                {link.label}
              </ScrollToTopLink>
            ))}
          </div>
          
  
        </div>

        {/* Right Column - CTA and Hamburger */}
        <div className="flex items-center justify-end gap-4">
          {/* Get in Touch button - visible on desktop */}
         

          {/* Get in Touch button - mobile version */}
          <div className="lg:hidden">
            <Button
              name="Get in Touch"
              fontSize="text-10px"
              className="py-1 px-1"
              openModal={true}
            />
          </div>

          {/* Hamburger Menu */}
   <button
  type="button"
  onClick={toggleMobileMenu}
  className="relative bg-black p-2 transition-all duration-300 flex flex-col items-end justify-center gap-1"
>
  {/* Line 1: 75% width */}
  <div className="w-4 h-0.5 bg-white rounded-sm"></div>
  
  {/* Line 2: 100% width */}
  <div className="w-6 h-0.5 bg-white rounded-sm"></div>
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