// menuAnimations.js
export const getContainerVariants = (isMobile) => ({
  hiddenLeft: {
    x: isMobile ? '-100%' : 0,
    y: isMobile ? 0 : '-100%',
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.5
    }
  },
  hiddenRight: {
    x: isMobile ? '100%' : 0,
    y: isMobile ? 0 : '100%',
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.5
    }
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.5
    }
  },
  exitLeft: {
    x: isMobile ? '-100%' : 0,
    y: isMobile ? 0 : '-100%',
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.5
    }
  },
  exitRight: {
    x: isMobile ? '100%' : 0,
    y: isMobile ? 0 : '100%',
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.5
    }
  }
});

export const getTextVariants = (isMobile) => ({
  hidden: { 
    opacity: 0,
    x: isMobile ? -50 : 0,
    y: isMobile ? 0 : 50
  },
  visible: { 
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0,
    x: isMobile ? -50 : 0,
    y: isMobile ? 0 : -50
  }
});