"use client";

import React from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  const errorIconRef = useRef(null);

  useEffect(() => {
    gsap.to(errorIconRef.current, {
      rotateY: 180,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-theme-100 to-theme-300 dark:from-theme-700 dark:to-theme-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-white dark:bg-theme-800 rounded-xl shadow-2xl"
      >
        <div ref={errorIconRef} className="text-6xl mb-4">
          ⚠️
        </div>
        <h2 className="text-3xl font-bold text-theme-800 dark:text-theme-100 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-xl text-theme-600 dark:text-theme-200 mb-6">
          {error.message}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-theme-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-theme-600 transition-colors duration-300"
          onClick={reset}
        >
          Try Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Error;
