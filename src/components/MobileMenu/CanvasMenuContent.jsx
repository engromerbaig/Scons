import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { contactDetails } from './modules/contactDetails';
import { services } from '../Services/servicesData';

import { socialsData } from './modules/socialsData';
import { navLinks } from '../Navbar/navLinks';
import { theme } from '../../theme';

const CanvasMenuContent = ({ handleClose }) => (
  <div className={`w-full h-full bg-black flex flex-col xl:flex-row  ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} gap-8 overflow-y-auto`}>

    {/* Left Side: NavLinks + Socials */}
    <div className="w-full md:w-1/2 flex flex-col justify-between">
      <div>
        <Link to="/" onClick={handleClose}>
          <img src="/logo.svg" alt="Logo" className="w-24 lg:w-32 mb-10" />
        </Link>
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            onClick={handleClose}
            className="block text-xl lg:text-3xl font-semibold text-white hover:text-neon mb-4"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-4 mt-10">
        {socialsData.map((social) => (
          <a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-white hover:text-neon"
          >
            {social.name}
          </a>
        ))}
      </div>
    </div>

    {/* Right Side: Services + Contact */}
    <div className="w-full md:w-1/2 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl lg:text-4xl font-bold text-neon mb-6">Our Services</h2>
        {services.map((service, index) => (
          <Link
            key={service.slug}
            to={`/service/${service.slug}`}
            onClick={handleClose}
            className="block text-xl lg:text-3xl font-semibold text-white hover:text-neon mb-4"
          >
            {service.heading}
          </Link>
        ))}
      </div>
      <div className="mt-10">
        {contactDetails.map((contact) => (
          <a
            key={contact.type}
            href={contact.link}
            className="block text-xl lg:text-2xl text-white hover:text-neon mb-2"
          >
            {contact.detail}
          </a>
        ))}
      </div>
    </div>
  </div>
);

CanvasMenuContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default CanvasMenuContent;
