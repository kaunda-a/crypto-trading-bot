"use client";

import React from "react";
import { motion } from "framer-motion";
import Bento from "@/components/ui/bento";

const TradingStrategies: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-theme-100 to-theme-300 dark:from-theme-700 dark:to-theme-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-theme-800 dark:text-theme-100 mb-4">
            Our AI-Powered Trading Solutions
          </h2>
          <p className="text-xl text-theme-600 dark:text-theme-200">
            Harness the power of artificial intelligence for smarter
            cryptocurrency trading
          </p>
        </motion.div>

        <Bento />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {["Trend Following", "Mean Reversion", "Arbitrage"].map(
            (strategy, index) => (
              <motion.div
                key={strategy}
                className="bg-white dark:bg-theme-800 rounded-2xl shadow-xl p-6 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-2xl font-semibold text-theme-500 dark:text-theme-300 mb-4">
                  {strategy} Strategy
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Advanced AI-driven {strategy.toLowerCase()} algorithms
                  optimized for cryptocurrency markets, maximizing potential
                  returns.
                </p>
                <motion.button
                  className="bg-theme-500 text-white px-6 py-2 rounded-md hover:bg-theme-600 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Explore Strategy
                </motion.button>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default TradingStrategies;
