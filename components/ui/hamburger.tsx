import React from "react";
import { motion } from "framer-motion";

interface HamburgerProps {
  isOpen: boolean;
  toggle: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isOpen, toggle }) => {
  return (
    <motion.button
      onClick={toggle}
      className="flex flex-col justify-center items-center w-10 h-10 rounded-md bg-theme-100 dark:bg-theme-800"
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        className="w-6 h-0.5 bg-theme-500 dark:bg-theme-200 mb-1"
        animate={{ rotate: isOpen ? 45 : 0, translateY: isOpen ? 2 : 0 }}
      />
      <motion.span
        className="w-6 h-0.5 bg-theme-500 dark:bg-theme-200 mb-1"
        animate={{ opacity: isOpen ? 0 : 1 }}
      />
      <motion.span
        className="w-6 h-0.5 bg-theme-500 dark:bg-theme-200"
        animate={{ rotate: isOpen ? -45 : 0, translateY: isOpen ? -2 : 0 }}
      />
    </motion.button>
  );
};

export default Hamburger;
