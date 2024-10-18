import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface CardHeaderProps {
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

interface CardContentProps {
  description?: string;
  children?: React.ReactNode;
}

interface CardFooterProps {
  footerContent?: React.ReactNode;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, onClick }) => {
  return (
    <motion.div
      className="group relative p-6 rounded-xl bg-white dark:bg-theme-700 shadow-lg border border-gray-200 dark:border-theme-600 transition-all hover:shadow-2xl hover:bg-theme-100 dark:hover:bg-theme-500 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {children}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-100 to-theme-200 dark:from-theme-800 dark:to-theme-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[-1] rounded-xl"></div>
    </motion.div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      {icon && <div className="text-theme-500 dark:text-theme-200">{icon}</div>}
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-theme-500 dark:group-hover:text-theme-200">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  description,
  children,
}) => {
  return (
    <div>
      {description && (
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({
  footerContent,
  children,
}) => {
  return (
    <div className="pt-4 border-t border-gray-200 dark:border-theme-600">
      {footerContent}
      {children}
    </div>
  );
};

export default Card;
