import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { contactDetails } from './modules/contactDetails';
import { services } from '../Services/servicesData';
import { socialsData } from './modules/socialsData';
import { navLinks } from '../Navbar/navLinks';
import { theme } from '../../theme';
import { FiArrowUpRight } from 'react-icons/fi';
import LegalPages from '../Footer/LegalPages';
import { technologiesData } from '../Technologies/technologiesData';
import SplideCarousel from '../SplideCarousel/SplideCarousel';

// Helper function to flatten technologiesData icons
const getAllTechnologyIcons = () => {
  const icons = [];
  Object.values(technologiesData).forEach(category => {
    Object.values(category).forEach(subCategory => {
      subCategory.forEach(tech => {
        if (tech.icon) {
          icons.push(tech.icon);
        }
      });
    });
  });
  return icons;
};

// Left Side Component
const LeftSide = ({ handleClose, isMobile = false }) => (
  <div className="flex flex-col h-full justify-between">
    <div>
      <Link to="/" onClick={handleClose}>
        <img src="/logo.svg" alt="Logo" className={`${isMobile ? 'w-24 mb-4' : 'w-24 lg:w-32 mb-6'}`} />
      </Link>
      {navLinks.map((link, idx) => (
        <Link
          key={idx}
          to={link.to}
          onClick={handleClose}
          className={`block ${isMobile ? 'text-lg mb-2' : 'text-xl lg:text-3xl mb-4'} font-semibold text-black hover:text-neon`}
        >
          {link.label}
        </Link>
      ))}
    </div>
    <div className="mt-auto">
      <div className={`flex flex-col ${isMobile ? 'gap-y-2' : 'gap-y-4'}`}>
        <div className={`flex ${isMobile ? 'gap-2' : 'gap-4'}`}>
          {socialsData.map((social) => (
            <a
              key={social.link}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isMobile ? 'text-sm p-2' : 'text-2xl p-2 lg:p-3'
              } bg-black rounded-full text-white hover:text-neon transition-colors duration-300`}
            >
              <social.icon />
            </a>
          ))}
        </div>
        <LegalPages onClick={handleClose} className="mt-0 mb-0" />
      </div>
    </div>
  </div>
);

// Right Side Component
const RightSide = ({ handleClose, isMobile = false }) => {
  const technologyIcons = getAllTechnologyIcons();

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className={`${isMobile ? 'text-xl mb-4' : 'text-2xl lg:text-4xl mb-6'} font-black text-black`}>Our Services</h2>
        <div className={`flex flex-wrap ${isMobile ? 'gap-2' : 'gap-4'}`}>
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/service/${service.slug}`}
              onClick={handleClose}
              className={`group inline-flex items-center gap-2 ${
                isMobile ? 'text-lg py-1' : 'text-xl lg:text-2xl py-2'
              } font-semibold text-black shadow-sm border-2 px-4 rounded-full border-neon hover:text-neon transition-colors duration-300`}
            >
              {service.heading}
              <FiArrowUpRight
                className="transform transition-transform duration-300 group-hover:rotate-45"
              />
            </Link>
          ))}
        </div>
        {!isMobile && (
          <>
            <h2 className="text-2xl lg:text-4xl font-black text-black mb-6 mt-10">Our Tech Stack</h2>
            <div className="w-full max-w-[50vw] h-[60px] cursor-pointer overflow-hidden">
              <SplideCarousel
                images={technologyIcons}
                perPage={4}
                mobilePerPage={2}
                haveBorder={false}
                height="40px"
                gap="3rem"
                pauseOnHover={false}
                objectFit="contain"
                imageRound="rounded-none"
                haveBgBlurred={false}
                className="w-full svg-black"
              />
            </div>
          </>
        )}
      </div>
      <div className="mt-auto">
        {contactDetails.map((contact) => (
          <a
            key={contact.type}
            href={contact.link}
            className={`block ${isMobile ? 'text-lg mb-1' : 'text-xl lg:text-3xl mb-2'} font-semibold text-black hover:text-neon`}
          >
            {contact.detail}
          </a>
        ))}
      </div>
    </div>
  );
};

const CanvasMenuContent = ({ handleClose }) => {
  return (
    <div
      className={`w-full h-screen bg-white flex flex-col xl:flex-row ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingMenuVertical} gap-8 overflow-hidden`}
    >
      {/* Mobile/Tablet Layout (<xl) */}
      <div className="flex xl:hidden flex-col h-full">
        <div className="h-1/2">
          <LeftSide handleClose={handleClose} isMobile />
        </div>
        <div className="h-1/2">
          <RightSide handleClose={handleClose} isMobile />
        </div>
      </div>

      {/* Desktop Layout (xl and above) */}
      <div className="hidden xl:flex w-full xl:w-1/2 flex-col h-full">
        <LeftSide handleClose={handleClose} />
      </div>
      <div className="hidden xl:flex w-full xl:w-1/2 flex-col h-full">
        <RightSide handleClose={handleClose} />
      </div>
    </div>
  );
};

CanvasMenuContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default CanvasMenuContent;