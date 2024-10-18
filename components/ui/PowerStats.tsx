import React from "react";
import { motion } from "framer-motion";

interface PowerStatsProps {
  className?: string;
}

const PowerStats: React.FC<PowerStatsProps> = ({ className }) => {
  return (
    <motion.div
      className={`${className} bg-white dark:bg-theme-700 rounded-lg shadow-lg p-6`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-theme-500 dark:text-theme-200 mb-4">
        Power Generation
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 dark:text-gray-300">Current Output</p>
          <p className="text-3xl font-bold text-theme-500 dark:text-theme-200">
            5.2 kW
          </p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-300">Daily Total</p>
          <p className="text-3xl font-bold text-theme-500 dark:text-theme-200">
            42.8 kWh
          </p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-300">Monthly Savings</p>
          <p className="text-3xl font-bold text-theme-500 dark:text-theme-200">
            $127.50
          </p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-300">Carbon Offset</p>
          <p className="text-3xl font-bold text-theme-500 dark:text-theme-200">
            1.2 tons
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PowerStats;
