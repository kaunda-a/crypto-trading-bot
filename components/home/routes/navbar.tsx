"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/theme-toggle";
import Hamburger from "../../ui/hamburger";
import { Menu, MenuItem, ProductItem, HoveredLink } from "../menu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const menuItems = [
    {
      title: "Products",
      content: (
        <div className="flex flex-col space-y-4 text-sm">
          <ProductItem
            title="Solar Panels"
            description="High-efficiency photovoltaic solutions"
            href="/products/solar-panels"
            src="/menu/crypto.jpg"
          />
          <ProductItem
            title="Inverters"
            description="Smart power conversion systems"
            href="/products/inverters"
            src="/menu/ibs.jpg"
          />
          <ProductItem
            title="Batteries"
            description="Advanced energy storage solutions"
            href="/products/batteries"
            src="/menu/eth.jpg"
          />
        </div>
      ),
    },
    {
      title: "Company",
      content: (
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/about">About Us</HoveredLink>
          <HoveredLink href="/contact">Contact</HoveredLink>
          <HoveredLink href="/pricing">Pricing</HoveredLink>
          <HoveredLink href="/insights">Insights</HoveredLink>
        </div>
      ),
    },
    {
      title: "Resources",
      content: (
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/blog">Blog</HoveredLink>
          <HoveredLink href="/privacy">Privacy</HoveredLink>
          <HoveredLink href="/terms">Terms & Conditions</HoveredLink>
          <HoveredLink href="/abuse">Abuse</HoveredLink>
          <HoveredLink href="/support">Support</HoveredLink>
        </div>
      ),
    },
  ];

  return (
    <motion.nav
      className="fixed w-full z-50 px-4 py-2 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SleekGrid Logo"
                width={40}
                height={40}
              />
              <span className="ml-2 text-2xl font-bold text-theme-500 dark:text-theme-200">
                crypto-bot
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <Menu setActive={setActiveItem}>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.title}
                  setActive={setActiveItem}
                  active={activeItem}
                  item={item.title}
                >
                  {item.content}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="md:hidden">
              <Hamburger isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {menuItems.map((item) => (
                  <div key={item.title} className="mb-4">
                    <h3 className="text-lg font-semibold text-theme-700 dark:text-theme-200 mb-2">
                      {item.title}
                    </h3>
                    {item.content}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
