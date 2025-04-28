// RHS.jsx
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { services } from '../../Services/servicesData';
import { socialsData } from './socialsData';
import { theme } from '../../../theme';

const RHS = ({ containerVariants, textVariants, handleClose }) => (
  <motion.div
    initial="hiddenRight"
    animate="visible"
    exit="exitRight"
    variants={containerVariants}
    transition={{ duration: 0.5, delayChildren: 0.2 }}
    className="w-full lg:w-1/2 h-1/2 lg:h-full bg-white flex flex-row overflow-hidden relative"
    
  >
    <div className="w-full flex flex-col py-4 md:py-6 lg:py-12">
      {/* Top Section (2/12) */}
      {/* <div className="h-[16.67%]">
        <motion.h2
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={textVariants}
          transition={{ duration: 0.3 }}
          className={`font-clashvar ${theme.layoutPages.paddingMenu} text-xl md:text-50px text-grayBg`}
        >
          Our Services
        </motion.h2>
      </div> */}

      {/* Middle Section (8/12) */}
      <div className="h-[90%] flex flex-col justify-between my-4 md:my-10  lg:my-20  ">
        {services.map((service, index) => (
          <motion.div
            key={service.number}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`${theme.layoutPages.paddingMenu}`}
          >
            <Link
              className="text-base lg:text-45px font-medium text-black font-clashvar hover:text-blue transition-colors duration-300"
              to={`/service/${service.slug}`}
              onClick={handleClose}
            >
              {service.heading}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section (2/12) */}
      <div className="h-[10%] flex items-end">
         <div className={`w-full flex lg:justify-end ${theme.layoutPages.paddingMenu} lg:px-8 rhs text-black text-30px`} >
               
         <div className="space-x-1 lg:space-x-4">
         <Link               onClick={handleClose}
 to="/terms-and-conditions" className="smooth-hover">Terms & Conditions</Link>
          <span>|</span>
          <Link               onClick={handleClose}
 to="/privacy-policy" className="smooth-hover">Privacy Policy</Link>
      </div>
      
                  </div>
      </div>




    </div>
  </motion.div>
);

RHS.propTypes = {
  containerVariants: PropTypes.object.isRequired,
  textVariants: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RHS;