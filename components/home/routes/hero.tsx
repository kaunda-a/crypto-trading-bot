// File: components/home/routes/hero.tsx

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-theme-100 to-theme-200 dark:from-theme-800 dark:to-theme-900">
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-theme-900 dark:text-theme-100 mb-6">
              Revolutionize Your Trading with AI
            </h1>
            <p className="text-xl md:text-2xl text-theme-700 dark:text-theme-300 mb-8">
              Harness the power of artificial intelligence to maximize your
              crypto trading potential.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="px-8 py-3 text-lg">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 mt-12 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/chatbot.png"
              alt="AI Trading Illustration"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 dark:opacity-40"></div>
    </section>
  );
};

export default Hero;
