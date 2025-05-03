import React from "react";
import { Link } from "react-router-dom";

// NEW: Contact details
import { contactDetails } from "../MobileMenu/modules/contactDetails";

// NEW: Navigation links
import { navLinks } from "../Navbar/navLinks";

// NEW: Services list

import { services } from "../Services/servicesData";


// NEW: Branch locations
import accordionData from "../Locations/modules/accordionData";

// NEW: Social icons (SVGs)
import { socialsData } from "../MobileMenu/modules/socialsData";

// NEW: Heading and BodyText components
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";

// NEW: ScrollToTopLink for logo
import ScrollToTopLink from "../../utilities/ScrollToTopLink";

// Theme (for padding etc)
import { theme } from "../../theme";

const Footer = () => {
  return (
    <footer className={`w-full bg-black text-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      {/* ROW 1: Logo + Contact | Pages | Services */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-10">
        {/* LOGO + CONTACT */}
        <div>
          <ScrollToTopLink to="/" className="cursor-pointer block mb-6">
            <img src="/logo.svg" alt="Logo" className="lg:w-36 w-28 aspect-rectangle svg-white" />
          </ScrollToTopLink>
          <Heading
            text={<span className="flex items-center"><span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />Contact</span>}
            size="text-base"
            color="text-white"
            className="mb-3"
          />
          <ul className="space-y-2">
            {contactDetails.map((item) => (
              <li key={item.type} className="flex items-center">
                <img src={item.icon} alt={item.type} className="w-5 h-5 mr-2" />
                <a
                  href={item.link}
                  className="neon-hover text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BodyText text={item.detail} size="text-base"             color="text-white"
 />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* PAGES */}
        <div>
          <Heading
            text={<span className="flex items-center"><span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />Pages</span>}
            size="text-base"
            color="text-white"
            className="mb-3"
          />
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="neon-hover text-white">
                  <BodyText text={link.label} size="text-base "              color="text-white"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <Heading
            text={<span className="flex items-center"><span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />Services</span>}
            size="text-base"
            color="text-white"
            className="mb-3"
          />
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/service/${service.slug}`}
                  className="neon-hover text-white"
                >
                  <BodyText text={service.heading} size="text-base"             color="text-white"
 />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ROW 2: Branches | Socials */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 py-10">
        {/* BRANCH 1: GLASGOW */}
        <div>
          <Heading
            text={<span className="flex items-center"><span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />{accordionData[0].title}</span>}
            size="text-base"
            color="text-white"
            className="mb-3"
          />
          <BodyText text={accordionData[0].content.address} size="text-base"              color="text-white"
 className="mb-1" />
          <BodyText text={accordionData[0].content.phone} size="text-base"             color="text-white"
  />
        </div>
        {/* BRANCH 2: KARACHI */}
        <div>
          <Heading
            text={<span className="flex items-center"><span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />{accordionData[1].title}</span>}
            size="text-base"
            color="text-white"
            className="mb-3"
          />
          <BodyText text={accordionData[1].content.address} size="text-base"              color="text-white"
 className="mb-1" />
          <BodyText text={accordionData[1].content.phone} size="text-base"             color="text-white"
  />
        </div>
        {/* SOCIALS */}
        <div>
          <Heading
            text={<span className="flex items-center"><span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />Social</span>}
            size="text-base"
            color="text-white"
            className="mb-3"
          />
          <div className="flex space-x-4">
            {socialsData.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-hover"
              >
                <img src={item.icon} alt="social" className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3: Copyright | Legal */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-6 text-gray-400 text-sm">
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
