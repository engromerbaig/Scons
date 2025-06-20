import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { navLinks } from '../../Navbar/navLinks';
import { contactDetails } from './contactDetails';
import { theme } from '../../../theme';
import jobListings from '../../../data/jobListings.json';

const LHS = ({ containerVariants, textVariants, handleClose }) => (
  <motion.div
    initial="hiddenLeft"
    animate="visible"
    exit="exitLeft"
    variants={containerVariants}
    transition={{ duration: 0.5, delayChildren: 0.2 }}
    className={`${theme.layoutPages.paddingMenu} ${theme.layoutPages.paddingMenuVertical} lhs w-full md:w-1/2 h-1/2 md:h-full bg-white flex flex-col `}
    style={{
      backgroundImage: `url('/sconsVertical.svg')`,
      backgroundPosition: 'right bottom',
      backgroundSize: '50% auto',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Top Section (2/12) */}
    <div className="h-[16.67%]">
      <Link to="/" className="cursor-pointer block" onClick={handleClose}>
        <img src="/logo.svg" alt="Logo" className="lg:w-32 w-24 aspect-rectangle" loading="lazy" />
      </Link>
    </div>

    {/* Middle Section (8/12) */}
    <div className="h-[66.66%] flex flex-col justify-between my-4 md:my-10 lg:my-20">
      {navLinks.map((link, index) => {
        const isScheduleLink = link.label === 'Schedule xa Meeting';
        const isPackagesLink = link.label === 'Packages';
        const isCareersLink = link.label === 'Careers';
        const hasJobListings = jobListings && jobListings.length > 0;

        return (
          <motion.div
            key={link.to}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <Link
              to={link.to}
              className={`
                ${isScheduleLink
                  ? 'text-sm lg:text-xl bg-black text-white rounded-full px-3  py-1 xl:py-2 font-semibold font-manrope'
                  : 'text-xl lg:text-45px font-semibold text-black font-manrope hover:text-neon active:text-neon transition-colors duration-300'}
              `}
              onClick={handleClose}
            >
              {link.label}
            </Link>
            {isPackagesLink && (
              <span className="bg-black text-white text-10px font-semibold px-2 py-[3px] rounded-full">
                Buy Now
              </span>
            )}
            {isCareersLink && hasJobListings && (
              <span className="bg-neon text-white text-10px font-semibold px-2 py-[3px] rounded-full">
                Hiring Now
              </span>
            )}
          </motion.div>
        );
      })}
    </div>

    {/* Bottom Section (2/12) */}
    <div className="h-[16.67%] flex flex-col space-y-0 md:space-y-6">
      {contactDetails.map((contact) => (
        <div key={contact.type} className="flex">
          <a
            href={contact.link}
            className="text-black text-xl lg:text-40px font-semibold hover:text-neon transition-colors duration-300"
          >
            {contact.detail}
          </a>
        </div>
      ))}
    </div>
  </motion.div>
);

LHS.propTypes = {
  containerVariants: PropTypes.object.isRequired,
  textVariants: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default LHS;