import React from "react";
import { motion } from "framer-motion";

interface SolarPanelProps {
  className?: string;
}

const SolarPanel: React.FC<SolarPanelProps> = ({ className }) => {
  return (
    <motion.div
      className={`bg-gradient-to-br from-theme-200 to-theme-400 rounded-lg shadow-xl ${className}`}
      initial={{ rotate: -10, scale: 0.9 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="grid grid-cols-4 grid-rows-4 gap-1 p-2 h-full">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-blue-400 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SolarPanel;
