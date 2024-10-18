"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconCoin, IconRobot, IconBrain } from "@tabler/icons-react";

const PricingTier = ({
  title,
  price,
  features,
  icon,
  popular = false,
}: {
  title: string;
  price: number;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`flex flex-col p-6 space-y-6 rounded-2xl shadow-xl ${
      popular ? "bg-theme-500 text-white" : "bg-white dark:bg-theme-700"
    }`}
  >
    <div className="space-y-2">
      {icon}
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-6xl font-bold">
        ${price}
        <span className="text-xl font-normal">/mo</span>
      </p>
    </div>
    <ul className="flex-1 space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center space-x-2">
          <IconCoin className="flex-shrink-0 w-5 h-5 text-theme-300" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button
      className={`px-8 py-3 rounded-xl text-lg font-semibold transition-colors duration-200 ${
        popular
          ? "bg-white text-theme-500 hover:bg-theme-100"
          : "bg-theme-500 text-white hover:bg-theme-600"
      }`}
    >
      Start Trading
    </button>
  </motion.div>
);

export const Pricing = () => {
  const tiers = [
    {
      title: "Basic Trader",
      price: 29,
      features: [
        "Access to 5 AI strategies",
        "Basic market analysis",
        "Email support",
      ],
      icon: <IconCoin className="w-12 h-12 text-theme-300" />,
    },
    {
      title: "Pro Trader",
      price: 99,
      features: [
        "Access to 15 AI strategies",
        "Advanced market analysis",
        "24/7 support",
        "Custom strategy builder",
      ],
      icon: <IconRobot className="w-12 h-12 text-theme-300" />,
      popular: true,
    },
    {
      title: "Elite Trader",
      price: 199,
      features: [
        "Access to all AI strategies",
        "Real-time AI market predictions",
        "Priority 24/7 support",
        "Custom strategy builder",
        "Exclusive webinars and insights",
      ],
      icon: <IconBrain className="w-12 h-12 text-theme-300" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-theme-100 to-white dark:from-theme-800 dark:to-theme-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-theme-700 dark:text-theme-100">
          Choose Your AI Trading Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
