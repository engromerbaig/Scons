// RHS.jsx
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { services } from '../../Services/servicesData';
import { socialsData } from './socialsData';
import { theme } from '../../../theme';
import { FiArrowUpRight } from 'react-icons/fi';

const RHS = ({ containerVariants, textVariants, handleClose }) => (
  <motion.div
    initial="hiddenRight"
    animate="visible"
    exit="exitRight"
    variants={containerVariants}
    transition={{ duration: 0.5, delayChildren: 0.2 }}
    className="w-full md:w-1/2 h-1/2 md:h-full bg-neon shadow-xl flex flex-row overflow-hidden relative"

  >
    <div className={`w-full flex flex-col ${theme.layoutPages.paddingMenuVertical}`}>
      {/* Top Section (2/12) */}
      <div className="h-[16.67%]">
        <motion.h2
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={textVariants}
          transition={{ duration: 0.3 }}
          className={` ${theme.layoutPages.paddingMenu} text-2xl md:text-60px font-bold text-black`}
        >
          Our Services
        </motion.h2>
      </div>

      {/* Middle Section (8/12) */}
      <div className="h-[66.66%] flex flex-col justify-between my-4 md:my-20  ">
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
              className="text-xl lg:text-45px group inline-flex items-center gap-2 font-semibold text-black  hover:text-white transition-colors duration-300"
              to={`/service/${service.slug}`}
              onClick={handleClose}
            >
              {service.heading}

               <FiArrowUpRight
                              className="transform transition-transform duration-300 group-hover:rotate-45"
                            />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section (2/12) */}
      <div className="h-[16.67%] flex items-end">
        <div className="py-2 md:py-4 px-4 md:px-8 rounded-r-full bg-black shadow-inner flex flex-row justify-between space-x-4">
         {socialsData.map((social, idx) => {
    const Icon = social.icon;
    return (
      <a
        key={idx}
        href={social.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-neon transition duration-300"
      >
        <Icon className="w-6 lg:w-7 h-6 lg:h-7 transition-transform " />
      </a>
    );
  })}

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