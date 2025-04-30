import React from 'react';
import { motion } from 'framer-motion';
import StatisticItem from './StatisticItem';
import projectIcon from "../../../assets/icons/unique/1.svg";
import clientIcon from "../../../assets/icons/unique/2.svg";
import marketIcon from "../../../assets/icons/unique/3.svg";
import officeIcon from "../../../assets/icons/unique/4.svg";



const Highlights = () => {
  // Define the stats directly in the Highlights component
  const stats = [
    { title: "Project Delivered", value: "1k+", icon: projectIcon },
    { title: "Active Clients", value: "120+", icon: clientIcon },
    { title: "Years on the Market", value: "10+", icon: marketIcon },
    { title: "Global Offices", value: "3+", icon: officeIcon },
  ];

  // Variants for individual StatisticItems to apply a basic fade-in with staggered timing
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }} // Stagger each child item
      className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-12 p-4" // Add padding to the grid container
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-neon/50 rounded-lg shadow-md flex flex-col items-center justify-start lg:justify-center py-4 lg:py-6 min-w-0" // Add padding and flex properties
        >
          <StatisticItem title={stat.title} value={stat.value} icon={stat.icon} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Highlights;