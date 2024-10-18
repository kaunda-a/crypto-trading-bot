"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-theme-100 to-theme-300 dark:from-theme-700 dark:to-theme-500">
      <div className="w-full max-w-4xl p-6 space-y-4">
        <motion.div
          className="h-12 bg-theme-200 dark:bg-theme-600 rounded-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="h-24 bg-theme-200 dark:bg-theme-600 rounded-md"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
        <motion.div
          className="h-64 bg-theme-200 dark:bg-theme-600 rounded-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              className="h-16 bg-theme-200 dark:bg-theme-600 rounded-md"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
