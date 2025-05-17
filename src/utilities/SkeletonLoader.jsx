import React from "react";
import { motion } from "framer-motion";

const SkeletonLoader = ({ className = "", rounded = "rounded-lg" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-gray-300 animate-pulse ${rounded} ${className}`}
    />
  );
};

export default SkeletonLoader;
