import React from "react";
import { motion } from "framer-motion";

interface EnergyWaveProps {
  className?: string;
}

const EnergyWave: React.FC<EnergyWaveProps> = ({ className }) => {
  return (
    <div className={`${className} overflow-hidden`}>
      <motion.svg
        viewBox="0 0 1440 320"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <path
          fill="#f59e0b"
          fillOpacity="0.5"
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </motion.svg>
    </div>
  );
};

export default EnergyWave;
