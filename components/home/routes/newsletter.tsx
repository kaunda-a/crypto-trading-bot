"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconSend, IconCheck, IconX } from "@tabler/icons-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus(Math.random() > 0.5 ? "success" : "error");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-theme-100 via-theme-200 to-theme-300 dark:from-theme-700 dark:via-theme-600 dark:to-theme-500">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-theme-800 dark:text-theme-100">
            Stay Ahead with Crypto-Bot Insights
          </h2>
          <p className="text-xl mb-8 text-theme-600 dark:text-theme-200">
            Subscribe to our newsletter for the latest in AI trading strategies
            and market analysis.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-6 py-3 rounded-full text-theme-800 bg-white dark:bg-theme-800 dark:text-theme-100 focus:outline-none focus:ring-2 focus:ring-theme-500"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-theme-500 text-white font-semibold flex items-center justify-center"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <IconSend className="w-6 h-6" />
                </motion.div>
              ) : (
                <>
                  Subscribe <IconSend className="ml-2 w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 text-green-600 dark:text-green-400 flex items-center justify-center"
              >
                <IconCheck className="mr-2" /> Successfully subscribed to
                Crypto-Bot insights!
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 text-red-600 dark:text-red-400 flex items-center justify-center"
              >
                <IconX className="mr-2" /> An error occurred. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
