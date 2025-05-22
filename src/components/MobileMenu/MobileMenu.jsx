import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import LHS from './modules/LHS';
import RHS from './modules/RHS';
import { getContainerVariants, getTextVariants } from './menuAnimations';

const MobileMenu = ({ isOpen, onClose, onCloseComplete }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
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
          initial="visible"
          exit="exit"
          animate="visible"
          className="fixed top-0 left-0 w-full h-screen flex flex-col md:flex-row z-[200] overflow-hidden"
        >
          <LHS
            containerVariants={containerVariants}
            textVariants={textVariants}
            handleClose={handleClose}
          />
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