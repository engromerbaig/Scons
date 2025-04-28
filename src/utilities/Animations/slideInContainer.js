// slideInContainer.js
const slideInContainerVariants = {
    hidden: { opacity: 0, x: 200 }, // Start off-screen to the right
    visible: {
      opacity: 1,
      x: 0, // Slide to the original position
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        delay: 0.3, // Optional delay before starting the animation
      },
    },
  };
  
  export default slideInContainerVariants;
  