import React from "react";
import { motion } from "framer-motion";

const CTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-theme-300 to-theme-500 dark:from-theme-600 dark:to-theme-400 py-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to get started?
        </motion.h2>
        <motion.p
          className="text-xl text-theme-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join thousands of satisfied users and take your project to the next
          level.
        </motion.p>
        <motion.button
          className="bg-white text-theme-500 px-8 py-3 rounded-md text-lg font-medium hover:bg-theme-100 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up Now
        </motion.button>
      </div>
    </section>
  );
};

export default CTA;
