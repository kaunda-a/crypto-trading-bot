// File: components/home/routes/clients.tsx

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  { name: "TechCorp", logo: "/images/clients/techcorp.svg" },
  { name: "InnovateLabs", logo: "/images/clients/innovatelabs.svg" },
  { name: "FutureFinance", logo: "/images/clients/futurefinance.svg" },
  { name: "CryptoTrust", logo: "/images/clients/cryptotrust.svg" },
  {
    name: "BlockchainSolutions",
    logo: "/images/clients/blockchainsolutions.svg",
  },
];

const Clients: React.FC = () => {
  return (
    <section className="py-16 bg-theme-50 dark:bg-theme-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-theme-800 dark:text-theme-100 mb-12">
          Trusted by Industry Leaders
        </h2>
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              className="w-1/2 sm:w-1/3 md:w-1/5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={150}
                height={60}
                className="w-full h-auto filter dark:invert"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
