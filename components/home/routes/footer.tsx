"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSun, FaLeaf, FaBolt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-theme-800 to-theme-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="SleekGrid Logo"
              width={150}
              height={50}
            />
            <p className="text-sm text-theme-200">
              financial solutions crypto-bot
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-300">
              Products
            </h3>
            <ul className="space-y-2">
              {[
                "trending",
                "Investment",
                "finance",
                "crypto",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-theme-100 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-300">
              Company
            </h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Partners", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-theme-100 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-theme-300">
              Connect
            </h3>
            <div className="flex space-x-4">
              {[FaSun, FaLeaf, FaBolt].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-theme-100 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-theme-600 text-center text-sm text-theme-300">
          © {new Date().getFullYear()} Crypto-bot. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
