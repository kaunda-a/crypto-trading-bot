import React from "react";
import { motion } from "framer-motion";

const Banner: React.FC = () => {
  return (
    <section className="bg-theme-200 dark:bg-theme-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Our Amazing Features
          </h2>
          <p className="text-xl text-theme-700 dark:text-theme-300 mb-8">
            Unlock the potential of our platform with these powerful tools
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Intuitive Design",
              "Powerful Analytics",
              "Seamless Integration",
            ].map((feature, index) => (
              <motion.div
                key={feature}
                className="bg-white dark:bg-theme-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-theme-500 dark:text-theme-300 mb-2">
                  {feature}
                </h3>
                <p className="text-theme-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
