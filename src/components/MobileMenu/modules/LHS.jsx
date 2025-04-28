// LHS.jsx
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { navLinks } from '../../Navbar/navLinks';
import { contactDetails } from './contactDetails';
import { theme } from '../../../theme';
import verticalLogo from '../../../assets/images/tyforaVertical.svg';


const LHS = ({ containerVariants, textVariants, handleClose }) => (
  <motion.div
    initial="hiddenLeft"
    animate="visible"
    exit="exitLeft"
    variants={containerVariants}
    transition={{ duration: 0.5, delayChildren: 0.2 }}
    className={`${theme.layoutPages.paddingMenu} lhs w-full lg:w-1/2 h-1/2 lg:h-full bg-grayBg flex flex-col py-4 md:py-6 lg:py-12`}
     style={{
          backgroundImage: `url(${verticalLogo})`,
          backgroundPosition: 'right',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
  >
    {/* Top Section (2/12) */}
    <div className="h-[16.67%] ">
      <Link to="/" className="cursor-pointer block" onClick={handleClose}>
        <img src="/logo.svg" alt="Logo" className="lg:w-36 w-28 aspect-rectangle" />
      </Link>
    </div>

    {/* Middle Section (8/12) */}
    <div className="h-[66.66%] flex flex-col justify-between  my-4 md:my-10 lg:my-20  ">
      {navLinks.map((link, index) => (
        <motion.div
          key={link.to}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={textVariants}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link
            to={link.to}
            className="text-xl lg:text-45px font-medium text-black font-clashvar hover:text-blue active:text-blue transition-colors duration-300"
            onClick={handleClose}
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
    </div>

    {/* Bottom Section (2/12) */}
    <div className="h-[16.67%]  flex flex-col space-y-1 lg:space-y-4">
      {contactDetails.map((contact) => (
        <div key={contact.type} className="flex flex-row items-center space-x-1 lg:space-x-4">
          <img
            src={contact.icon}
            alt={`${contact.type} Icon`}
            className="w-5 aspect-square"
          />
          <a
            href={contact.link}
            className="text-black text-sm lg:text-30px font-medium smooth-hover"
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