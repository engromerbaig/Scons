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

const CanvasMenuContent = ({ handleClose }) => {
  // Get all technology icons for the carousel
  const technologyIcons = getAllTechnologyIcons();

  return (
    <div className={`w-full h-screen bg-white flex flex-col xl:flex-row ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} gap-8 overflow-hidden`}>
      {/* Left Side: NavLinks + Socials + LegalPages */}
      <div className="w-full md:w-1/2 flex flex-col h-full">
        <div className="flex flex-col h-full justify-between">
          {/* Top Section */}
          <div>
            <Link to="/" onClick={handleClose}>
              <img src="/logo.svg" alt="Logo" className="w-24 lg:w-32 mb-6" />
            </Link>
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                onClick={handleClose}
                className="block text-xl lg:text-3xl font-semibold text-black hover:text-neon mb-4"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-auto">
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-4">
                {socialsData.map((social) => (
                  <a
                    key={social.link}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl bg-black p-2 lg:p-3 rounded-full text-white hover:text-neon transition-colors duration-300"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
              <LegalPages onClick={handleClose} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Services + Tech Stack + Contact */}
      <div className="w-full md:w-1/2 flex flex-col h-full">
        <div className="flex flex-col h-full justify-between">
          {/* Top Section */}
          <div>
            <h2 className="text-2xl lg:text-4xl font-black text-black mb-6">Our Services</h2>
            <div className="flex flex-wrap gap-4">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to={`/service/${service.slug}`}
                  onClick={handleClose}
                  className="group inline-flex items-center gap-2 text-xl lg:text-2xl font-semibold text-black shadow-sm border-2 px-4 py-2 rounded-full border-neon hover:text-neon transition-colors duration-300"
                >
                  {service.heading}
                  <FiArrowUpRight
                    className="transform transition-transform duration-300 group-hover:rotate-45"
                  />
                </Link>
              ))}
            </div>

            {/* Tech Stack Section */}
            <h2 className="text-2xl  font-black text-black mb-6 mt-10">Our Tech Stack:</h2>
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
          </div>

          {/* Bottom Section */}
          <div className="mt-auto">
            {contactDetails.map((contact) => (
              <a
                key={contact.type}
                href={contact.link}
                className="block text-xl font-semibold lg:text-3xl text-black hover:text-neon mb-2"
              >
                {contact.detail}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

CanvasMenuContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default CanvasMenuContent;