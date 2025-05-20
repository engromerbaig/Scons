import { useState, useEffect } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import { theme } from '../../theme';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';
import { contactDetails } from '../MobileMenu/modules/contactDetails';
import Button from '../Button/Button';

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
      } ${theme.layoutPages.paddingHorizontal} py-4 lg:py-6 flex justify-between items-center w-full z-[50] transition-all duration-300`}
    >
      <div className="flex items-center">
        <ScrollToTopLink to="/" className="cursor-pointer">
          <img src="/logo2.svg" alt="Logo" className="lg:w-28 w-20 aspect-rectangle" loading="lazy" />
        </ScrollToTopLink>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        {/* Phone details only on lg and above */}
        {phoneDetail && (
          <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-black">
            <PhoneIcon className="text-black text-xl" />
            <a href={phoneDetail.link} className="text-base font-bold hover:text-neon transition-colors">
              {phoneDetail.detail}
            </a>
          </div>
        )}

        {/* Get in Touch button only on below lg */}
        <div className="">
          <Button
            name="Get in Touch"
            fontSize="text-10px"
            className="py-1 px-1"
            openModal={true}
          />
        </div>

        <button type="button" onClick={toggleMobileMenu} className="relative">
          <img
            src="/hamburger.svg"
            alt="Menu"
            className="w-6 aspect-square z-[200]"
            loading="lazy"
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