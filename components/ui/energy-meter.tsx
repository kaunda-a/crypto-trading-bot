import React from "react";
import { motion } from "framer-motion";

interface EnergyMeterProps {
  className?: string;
}

const EnergyMeter: React.FC<EnergyMeterProps> = ({ className }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-lg ${className}`}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="w-full bg-green-400"
        initial={{ height: "0%" }}
        animate={{ height: "75%" }}
        transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
      />
    </motion.div>
  );
};

export default EnergyMeter;
