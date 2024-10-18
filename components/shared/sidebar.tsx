import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconSettings,
  IconHistory,
  IconChartBar,
  IconChevronDown,
  IconChevronRight,
  IconRobot,
  IconCurrencyDollar,
} from "@tabler/icons-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.FC<{ className?: string; stroke?: number }>;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: IconHome as React.FC<{ className?: string; stroke?: number }>,
  },
  {
    name: "Bot",
    href: "/dashboard",
    icon: IconRobot as React.FC<{ className?: string; stroke?: number }>,
    subItems: [
      {
        name: "Bot Config",
        href: "/dashboard/bot-config",
        icon: IconSettings as React.FC<{ className?: string; stroke?: number }>,
      },
      {
        name: "Bot manager",
        href: "/dashboard/bot-management",
        icon: IconSettings as React.FC<{ className?: string; stroke?: number }>,
      },
      {
        name: "Bot Status",
        href: "/dashboard/bot-status",
        icon: IconChartBar as React.FC<{ className?: string; stroke?: number }>,
      },
    ],
  },
  {
    name: "trades",
    href: "/dashboard",
    icon: IconChartBar as React.FC<{ className?: string; stroke?: number }>,
    subItems: [
      {
        name: "Performance",
        href: "/dashboard/performance",
        icon: IconChartBar as React.FC<{ className?: string; stroke?: number }>,
      },
      {
        name: "Overall Performance",
        href: "/dashboard/overall",
        icon: IconChartBar as React.FC<{ className?: string; stroke?: number }>,
      },
      {
        name: "insights",
        href: "/dashboard/insights",
        icon: IconRobot as React.FC<{ className?: string; stroke?: number }>,
      },
    ],
  },
  {
    name: "Trading History",
    href: "/dashboard/trading-history",
    icon: IconHistory as React.FC<{ className?: string; stroke?: number }>,
  },
  {
    name: "Market Analysis",
    href: "/dashboard/market-analysis",
    icon: IconCurrencyDollar as React.FC<{
      className?: string;
      stroke?: number;
    }>,
  },
];
const AlienSeparator: React.FC = () => (
  <div className="my-2 flex items-center justify-center" role="separator">
    <div className="h-px bg-theme-300 dark:bg-theme-700 w-1/4"></div>
    <svg
      className="w-6 h-6 mx-2 text-theme-500 dark:text-theme-400"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z" />
    </svg>
    <div className="h-px bg-theme-300 dark:bg-theme-700 w-1/4"></div>
  </div>
);

const NavItemComponent: React.FC<{ item: NavItem; level?: number }> = ({
  item,
  level = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <Link
        href={item.href}
        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
          isActive
            ? "bg-theme-100 dark:bg-theme-800 text-theme-900 dark:text-white"
            : "text-gray-600 dark:text-gray-300 hover:bg-theme-50 dark:hover:bg-theme-900 hover:text-theme-900 dark:hover:text-white"
        }`}
        style={{ paddingLeft: `${level * 1 + 0.5}rem` }}
        onClick={item.subItems ? toggleOpen : undefined}
        role="menuitem"
        aria-haspopup={item.subItems ? "true" : "false"}
        aria-expanded={item.subItems ? isOpen : undefined}
        aria-current={isActive ? "page" : undefined}
      >
        <item.icon
          className="mr-3 flex-shrink-0 h-6 w-6"
          stroke={1.5}
          aria-hidden="true"
        />
        <span className="flex-1">{item.name}</span>
        {item.subItems && (
          <span className="ml-auto" aria-hidden="true">
            {isOpen ? (
              <IconChevronDown className="h-5 w-5" />
            ) : (
              <IconChevronRight className="h-5 w-5" />
            )}
          </span>
        )}
      </Link>
      {item.subItems && (
        <div
          className={`ml-4 ${isOpen ? "block" : "hidden"}`}
          role="menu"
          aria-label={`${item.name} submenu`}
        >
          {item.subItems.map((subItem) => (
            <NavItemComponent
              key={subItem.name}
              item={subItem}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <aside
      className="w-64 bg-white dark:bg-theme-950 shadow-xl overflow-y-auto"
      role="navigation"
      aria-label="Main Navigation"
    >
      <nav className="mt-5 px-2" role="menu">
        {navItems.map((item, index) => (
          <React.Fragment key={item.name}>
            <NavItemComponent item={item} />
            {index < navItems.length - 1 && <AlienSeparator />}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
};
