import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import LHS from './modules/LHS';
import RHS from './modules/RHS';
import { getContainerVariants, getTextVariants } from './menuAnimations';
import { socialsData } from './modules/socialsData';

const MobileMenu = ({ isOpen, onClose, onCloseComplete }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1026);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1026);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowCloseButton(true), 500);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
      };
    }
    // Immediately hide the button when menu starts closing
    setShowCloseButton(false);
    document.body.style.overflow = '';
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleClose = () => {
    // First hide the button
    setShowCloseButton(false);
    // Then trigger the closing animation
    onClose();
  };

  const containerVariants = getContainerVariants(isMobile);
  const textVariants = getTextVariants(isMobile);

  return (
    <AnimatePresence onExitComplete={onCloseComplete}>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="fixed top-0 left-0 w-full h-screen flex flex-col lg:flex-row z-[200] overflow-hidden"
        >
          <LHS
            containerVariants={containerVariants}
            textVariants={textVariants}
            handleClose={handleClose}
          />

          {/* Centered Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="pointer-events-none absolute left-1/2 top-0 h-full transform -translate-x-1/2 z-[250] flex flex-col items-center justify-center"
          >
            {/* Line - vertical for desktop, horizontal for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className={`absolute bg-neon -z-10 ${
                isMobile
                  ? 'w-screen h-2 top-1/2 left-1/2 -translate-x-1/2'
                  : 'inset-y-0 w-2'
              }`}
            ></motion.div>

            {/* Pill container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className={`bg-neon rounded-full pointer-events-auto ${
                isMobile ? 'py-3 px-8 flex-row space-x-4' : 'py-12 px-6 flex-col space-y-8'
              } flex items-center justify-center`}
            >
              {socialsData.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300"
                >
                  <img
                    src={social.icon}
                    alt={`${social.name} Icon`}
                    className="w-6 lg:w-7 aspect-square hover:scale-125 transition-all duration-300"
                    loading="lazy"
                  />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <RHS
            containerVariants={containerVariants}
            textVariants={textVariants}
            handleClose={handleClose}
          />

          {/* Only render button if showCloseButton is true */}
          {showCloseButton && (
            <motion.button
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute top-3 right-2 lg:top-6 lg:right-6 text-25px border-2  lg:border-4 font-extrabold border-neon text-neon rounded-full w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center"
            >
              ✕
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCloseComplete: PropTypes.func.isRequired,
};

export default MobileMenu;