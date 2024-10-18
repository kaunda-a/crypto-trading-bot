"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-theme-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About SleekGrid
      </motion.h1>

      <motion.p
        className="text-lg text-center mb-8 text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        SleekGrid is committed to providing innovative solar solutions that
        empower homeowners and businesses to harness the power of the sun. Our
        mission is to create a sustainable future through renewable energy
        solutions that are efficient, reliable, and affordable.
      </motion.p>

      <motion.h2
        className="text-2xl font-semibold text-center mb-4 text-theme-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Our Vision
      </motion.h2>
      <motion.p
        className="text-lg text-center mb-6 text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        We envision a world where renewable energy is accessible to everyone,
        reducing dependence on fossil fuels and combating climate change.
      </motion.p>

      <motion.h2
        className="text-2xl font-semibold text-center mb-4 text-theme-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Our Commitment
      </motion.h2>
      <motion.p
        className="text-lg text-center mb-6 text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        At SleekGrid, we are dedicated to providing exceptional customer service
        and support throughout your solar journey. From consultation to
        installation and beyond, we are here to ensure a seamless experience and
        maximum savings.
      </motion.p>

      <motion.h2
        className="text-2xl font-semibold text-center mb-4 text-theme-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        Join Us in Making a Difference
      </motion.h2>
      <motion.p
        className="text-lg text-center text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        Together, we can create a brighter, cleaner, and more sustainable
        future. Join the SleekGrid family today and start your solar journey!
      </motion.p>
    </div>
  );
};

export default AboutUs;
