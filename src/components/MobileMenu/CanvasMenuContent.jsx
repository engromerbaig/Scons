import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { contactDetails } from './modules/contactDetails';
import { services } from '../Services/servicesData';

import { socialsData } from './modules/socialsData';
import { navLinks } from '../Navbar/navLinks';
import { theme } from '../../theme';


import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi"; 

import LegalPages from '../Footer/LegalPages';



const CanvasMenuContent = ({ handleClose }) => (
  <div className={`w-full h-full bg-white flex flex-col xl:flex-row  ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} gap-8 overflow-y-auto`}>

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
            className="block text-xl lg:text-3xl font-semibold text-black hover:text-neon mb-4"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-4 mt-10">
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
    </div>

    {/* Right Side: Services + Contact */}
    <div className="w-full md:w-1/2 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl lg:text-4xl font-black text-black mb-6">Our Services</h2>


<div className="flex flex-wrap gap-4">
  {services.map((service) => (
    <Link
      key={service.slug}
      to={`/service/${service.slug}`}
      onClick={handleClose}
      className="group inline-flex items-center gap-2 text-xl lg:text-2xl font-semibold text-black border-2 px-4 py-2 rounded-full border-neon hover:text-neon transition-colors duration-300"
    >
      {service.heading}
      <FiArrowUpRight
        className="transform transition-transform duration-300 group-hover:rotate-45"
      />
    </Link>
  ))}
</div>



      </div>
      <div className="mt-10">
        {contactDetails.map((contact) => (
          <a
            key={contact.type}
            href={contact.link}
            className="block text-xl font-semibold lg:text-3xl text-black hover:text-neon mb-2"
          >
            {contact.detail}
          </a>
        ))}

                <LegalPages onClick={handleClose} />

      </div>
    </div>
  </div>
);

CanvasMenuContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default CanvasMenuContent;
