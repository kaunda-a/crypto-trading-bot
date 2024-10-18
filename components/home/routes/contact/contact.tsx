"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-theme-100 to-theme-200 dark:from-theme-800 dark:to-theme-900 rounded-xl shadow-2xl">
      <motion.h1
        className="text-5xl font-extrabold text-center mb-6 text-theme-500 dark:text-theme-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Connect with Crypto-Bot
      </motion.h1>

      <motion.p
        className="text-xl text-center mb-10 text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Have questions about our AI-driven trading strategies or need support?
        Our team of crypto experts is here to assist you 24/7.
      </motion.p>

      <div className="flex justify-center mb-10">
        <motion.div
          className="w-full max-w-md p-8 bg-white dark:bg-theme-800 rounded-lg shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-theme-500 dark:text-theme-300 text-center mb-6">
            Reach Out to Us
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submitted!");
            }}
            className="space-y-6"
          >
            <Input
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-3 bg-theme-50 dark:bg-theme-700 border-2 border-theme-200 dark:border-theme-600 rounded-lg focus:ring-2 focus:ring-theme-400"
            />
            <Input
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-3 bg-theme-50 dark:bg-theme-700 border-2 border-theme-200 dark:border-theme-600 rounded-lg focus:ring-2 focus:ring-theme-400"
            />
            <Textarea
              placeholder="Your Message"
              required
              className="w-full p-3 bg-theme-50 dark:bg-theme-700 border-2 border-theme-200 dark:border-theme-600 rounded-lg focus:ring-2 focus:ring-theme-400 h-32"
            />
            <div className="flex justify-center">
              <Button className="px-8 py-3 text-lg font-semibold rounded-full bg-theme-500 text-white hover:bg-theme-400 transition-colors transform hover:scale-105">
                Send Message
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
