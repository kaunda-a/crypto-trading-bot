"use client";

import React from "react";
import { motion } from "framer-motion";
import Banner from "@/components/home/routes/insights/banner";

const InsightsPage: React.FC = () => {
  const companyValues = [
    {
      title: "Innovation",
      description: "Pushing the boundaries of AI-driven trading",
      icon: "🚀",
    },
    {
      title: "Security",
      description: "Ensuring the safety of your assets",
      icon: "🔒",
    },
    {
      title: "Transparency",
      description: "Clear and honest trading practices",
      icon: "👁️",
    },
    {
      title: "User-Centric",
      description: "Tailored solutions for every trader",
      icon: "👤",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-theme-100 to-theme-300 dark:from-theme-700 dark:to-theme-500 py-16 pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-theme-800 dark:text-theme-100 mb-4">
            Insights on Crypto-Bot
          </h2>
          <p className="text-xl text-theme-600 dark:text-theme-200">
            Leading the way in AI-powered cryptocurrency trading
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-white dark:bg-theme-800 rounded-2xl shadow-xl p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-theme-500 dark:text-theme-300 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To democratize cryptocurrency trading through advanced AI
              technologies, providing traders of all levels with powerful,
              intuitive tools for success in the digital asset market.
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-theme-800 rounded-2xl shadow-xl p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-theme-500 dark:text-theme-300 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To be the global leader in AI-driven cryptocurrency trading
              solutions, shaping the future of digital finance and empowering
              traders worldwide.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyValues.map((value, index) => (
            <motion.div
              key={value.title}
              className="bg-white dark:bg-theme-700 rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              }}
            >
              <span className="text-4xl mb-4 block">{value.icon}</span>
              <h3 className="text-xl font-semibold text-theme-500 dark:text-theme-200 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <Banner />
    </section>
  );
};

export default InsightsPage;
