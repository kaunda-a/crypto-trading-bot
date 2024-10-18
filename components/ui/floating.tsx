import React from "react";
import { motion } from "framer-motion";

interface FloatingIconProps {
  icon: string;
  className?: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon, className }) => {
  return (
    <motion.div
      className={`text-4xl ${className}`}
      initial={{ y: 0 }}
      animate={{ y: ["-10px", "10px"] }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
    >
      {icon}
    </motion.div>
  );
};

export default FloatingIcon;
