import React from "react";
import { Link } from "react-router-dom";
import { contactDetails } from "../MobileMenu/modules/contactDetails";
import { navLinks } from "../Navbar/navLinks";
import { services } from "../Services/servicesData";
import accordionData from "../Locations/modules/accordionData";
import { socialsData } from "../MobileMenu/modules/socialsData";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import ScrollToTopLink from "../../utilities/ScrollToTopLink";
import { theme } from "../../theme";

const Footer = () => {
  return (
    <footer className={`w-full bg-black text-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      
      {/* ROW 1: Logo + Contact | Pages | Services */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-10 text-left">
        
        {/* LOGO + CONTACT */}
        <div>
          <ScrollToTopLink to="/" className="cursor-pointer block mb-6">
            <img src="/logo.svg" alt="Logo" className="lg:w-36 w-28 aspect-rectangle svg-white" />
          </ScrollToTopLink>

          <div className="flex items-center mb-3">
            <span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />
            <Heading text="Contact" size="text-base" color="text-grayText" />
          </div>

          <ul className="space-y-2">
            {contactDetails.map((item) => (
              <li key={item.type}>
                <a
                  href={item.link}
                  className="neon-hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BodyText text={item.detail} size="text-30px" color="text-white" className="text-start " />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* PAGES */}
        <div>
          <div className="flex items-center mb-3">
            <span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />
            <Heading text="Resources" size="text-base" color="text-grayText" />
          </div>

          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="neon-hover">
                  <BodyText text={link.label} size="text-base" color="text-white" className="text-start" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <div className="flex items-center mb-3">
            <span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />
            <Heading text="Services" size="text-base" color="text-grayText" />
          </div>

          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/service/${service.slug}`} className="neon-hover">
                  <BodyText text={service.heading} size="text-base" color="text-white" className="text-start"/>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ROW 2: Branches | Socials */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 py-10 text-left">
        {[0, 1].map((idx) => (
          <div key={idx}>
            <div className="flex items-center mb-3">
              <span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />
              <Heading text={accordionData[idx].title} size="text-base" color="text-grayText" />
            </div>
            <BodyText text={accordionData[idx].content.address} size="text-base" color="text-white" className="mb-1 text-start" />
            <BodyText text={accordionData[idx].content.phone} size="text-base" color="text-white" className="text-start" />
          </div>
        ))}

        {/* SOCIALS */}
        <div>
          <div className="flex items-center mb-3">
            <span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />
            <Heading text="Social" size="text-base" color="text-grayText" />
          </div>

          <div className="flex space-x-4">
            {socialsData.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="svg-white hover:svg-neon transition-colors duration-200"
              >
                <img src={item.icon} alt="social" className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3: Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-6 text-gray-400 text-sm text-left">
        <div>
          &copy; {new Date().getFullYear()} <span className="uppercase font-bold text-white">tyfora.</span> All Rights Reserved
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link to="/privacy-policy" className="neon-hover">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms-and-conditions" className="neon-hover">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
