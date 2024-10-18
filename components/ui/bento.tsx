import React from "react";
import { motion } from "framer-motion";

const Bento: React.FC = () => {
  const bentoItems = [
    {
      title: "Efficiency",
      value: "22%",
      description: "Industry-leading conversion rate",
    },
    {
      title: "Durability",
      value: "25+ years",
      description: "Long-lasting performance",
    },
    {
      title: "Warranty",
      value: "20 years",
      description: "Comprehensive coverage",
    },
    { title: "Savings", value: "Up to 70%", description: "On energy bills" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {bentoItems.map((item, index) => (
        <motion.div
          key={item.title}
          className="bg-white dark:bg-theme-700 rounded-xl p-6 shadow-lg cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.h3
            className="text-lg font-semibold text-theme-500 dark:text-theme-200 mb-2"
            whileHover={{ scale: 1.1 }}
          >
            {item.title}
          </motion.h3>
          <motion.p
            className="text-3xl font-bold text-theme-600 dark:text-theme-100 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {item.value}
          </motion.p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default Bento;
