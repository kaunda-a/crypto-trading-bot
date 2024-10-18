// File: components/shared/menu.tsx

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Bots", href: "/dashboard/bots", icon: "🤖" },
  { name: "Market Analysis", href: "/dashboard/market-analysis", icon: "📈" },
  { name: "Performance", href: "/dashboard/performance", icon: "🚀" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export const Menu: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-theme-50 to-theme-100 dark:from-theme-800 dark:to-theme-900 border-b border-theme-200 dark:border-theme-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ease-in-out",
                  pathname === item.href
                    ? "border-theme-500 text-theme-900 dark:text-theme-100"
                    : "border-transparent text-theme-500 hover:border-theme-300 hover:text-theme-700 dark:text-theme-300 dark:hover:text-theme-100"
                )}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-theme-500"
                    layoutId="underline"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
