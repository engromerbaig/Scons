import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import Button from "../Button/Button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const footerLinks = [
  {
    heading: "Company",
    links: [
      { name: "About Us", to: "/about" },
      { name: "Testimonials", to: "/testimonials" },
      { name: "Process", to: "/process" },
      { name: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { name: "Blog", to: "/blog" },
      { name: "Events", to: "/events" },
      { name: "Press Release", to: "/press-release" },
      { name: "Work", to: "/work" },
    ],
  },
  {
    heading: "Services",
    links: [
      { name: "Mobile App", to: "/services/mobile-app" },
      { name: "Game Development", to: "/services/game-development" },
      { name: "Blockchain Development", to: "/services/blockchain-development" },
      { name: "AI Development", to: "/services/ai-development" },
    ],
  },
  {
    heading: "Insights",
    links: [
      { name: "University", to: "/university" },
      { name: "Careers", to: "/careers" },
      { name: "Manifesto", to: "/manifesto" },
      { name: "Culture Book", to: "/culture-book" },
    ],
  },
];

const locations = [
  {
    city: "West Palm Beach",
    address: [
      "560 Village Blvd., Suite 120 #3,",
      "West Palm Beach, FL-33409,",
      "United States",
    ],
  },
  {
    city: "Manchester",
    address: [
      "73 Meadowway, Bramhall",
      "Stockport, Manchester - SK7 1LX,",
      "United Kingdom",
    ],
  },
  {
    city: "Dubai",
    address: [
      "Building 11, Level 7, Bay Square,",
      "Business Bay, Dubai - 23304,",
      "United Arab Emirates",
    ],
  },
  {
    city: "Karachi",
    address: [
      "54C, Kashmir Road, Block 2,",
      "PECHS, Karachi, Sindh - 75400,",
      "Pakistan",
    ],
  },
];

const Footer = () => {
  return (
    <footer className={`w-full bg-black text-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}  `}>
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-800 pb-12">
        {footerLinks.map((section) => (
          <div key={section.heading}>
            <h3 className="text-lg font-semibold mb-4 text-neon">{section.heading}</h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link to={link.to} className="hover:text-neon transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Locations */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-6">
        {locations.map((loc) => (
          <div key={loc.city}>
            <h4 className="text-lg font-semibold text-neon mb-2">{loc.city}</h4>
            <address className="not-italic text-gray-300 text-sm leading-relaxed">
              {loc.address.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </address>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between items-start md:items-center mt-8 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-neon mb-2">Contact</h4>
          <div className="text-2xl font-bold mb-1">866-978-2220</div>
          <div className="text-lg">info@cubix.co</div>
        </div>
        <div className="mt-6 md:mt-0">
          {/* Add your social icons here */}
          <div className="flex space-x-6">
            {/* Replace with your actual SVGs or icon components */}
            <a href="#" aria-label="LinkedIn" className="hover:text-neon">
              {/* LinkedIn SVG */}
            </a>
            <a href="#" aria-label="X" className="hover:text-neon">
              {/* X (Twitter) SVG */}
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-neon">
              {/* Facebook SVG */}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-6 text-gray-400 text-sm">
        <div>
          &copy; {new Date().getFullYear()} <span className="uppercase font-bold text-white">cubix.</span> All Rights Reserved
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link to="/privacy-policy" className="hover:text-neon">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms-and-conditions" className="hover:text-neon">Terms &amp; Conditions</Link>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="bg-green-700 text-xs px-2 py-1 rounded">DMCA Protected</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
