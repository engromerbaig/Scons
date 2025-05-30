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
import Button from "../Button/Button";
import LegalPages from "./LegalPages";

const Footer = () => {
  return (
    <footer className={`w-full bg-black text-white min-h-screen ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      
      {/* ROW 1: Logo + Contact | Pages | Services */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-12 border-b border-gray-800 pb-10 text-left">
        
        {/* LOGO + CONTACT */}
        <div>
          <ScrollToTopLink to="/" className="cursor-pointer block mb-6">
            <img src="/logo2.svg" alt="Logo" loading='lazy' className="lg:w-28 w-20 aspect-rectangle" />
          </ScrollToTopLink>

          <div className="flex items-center mb-3">
            <span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />
            <Heading text="Contact" size="text-sm" color="text-grayText" />
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
                  <BodyText text={item.detail} size="text-30px" color="text-white" className="text-start neon-hover" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* PAGES */}
        <div>
          <div className="flex items-center mb-3">
            <span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />
            <Heading text="Resources" size="text-sm" color="text-grayText" />
          </div>

          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="neon-hover">
                  <BodyText text={link.label} size="text-30px" color="text-white" className="text-start neon-hover" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <div className="flex items-center mb-3">
            <span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />
            <Heading text="Services" size="text-sm" color="text-grayText" />
          </div>

          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/service/${service.slug}`} className="neon-hover">
                  <BodyText text={service.heading} size="text-30px" color="text-white" className="text-start neon-hover" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ROW 2: Branches | Socials */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-12 border-b border-gray-800 py-10 text-left">
        {[0, 1].map((idx) => (
          <div key={idx}>
            <div className="flex  items-center mb-3">
              <span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />
              <Heading text={accordionData[idx].title} size="text-30px" color="text-white  " />
            </div>
            <BodyText text={accordionData[idx].content.address} size="text-sm" color="text-grayText" className="mb-1 text-start neon-hover" />
            <BodyText text={accordionData[idx].content.phone} size="text-sm" color="text-grayText" className="text-start neon-hover" />
          </div>
        ))}

        {/* SOCIALS */}
       <div>
  <div className="flex items-center mb-3">
    <span className="inline-block w-2 h-2 bg-neon rounded-full mr-2" />
    <Heading text="Our Channels" size="text-base" color="text-grayText" />
  </div>

  <div className="flex space-x-4 xl:space-x-6">
    {socialsData.map((item, idx) => {
      const Icon = item.icon;
      return (
        <a
          key={idx}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-neon transition-colors duration-200"
        >
          <Icon className="text-35px" />
        </a>
      );
    })}
  </div>
</div>







        
      </div>

      {/* ROW 3: Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-6 text-grayText text-sm text-left">
        <div>
          &copy; {new Date().getFullYear()} <span className="  text-grayText">Scons.</span> All Rights Reserved
        </div>
      <LegalPages/>
      </div>
    </footer>
  );
};

export default Footer;
