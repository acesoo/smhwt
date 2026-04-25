"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  ariaLabel: string;
  icon: (active: boolean) => React.ReactNode;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    ariaLabel: "Go to dashboard home",
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3" y="3" width="7" height="7" rx="2"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? "0.15" : "0"}
        />
        <rect
          x="12" y="3" width="7" height="7" rx="2"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? "0.15" : "0"}
        />
        <rect
          x="3" y="12" width="7" height="7" rx="2"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? "0.15" : "0"}
        />
        <rect
          x="12" y="12" width="7" height="7" rx="2"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? "0.15" : "0"}
        />
      </svg>
    ),
  },
  {
    href: "/log",
    label: "Log",
    ariaLabel: "Go to mood log entry",
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="11" cy="11" r="7"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? "0.12" : "0"}
        />
        <path
          d="M11 7.5V11L13.5 13.5"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/journal",
    label: "Journal",
    ariaLabel: "Go to journal entries",
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 5.5h14M4 11h9M4 16.5h11"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/search",
    label: "Search",
    ariaLabel: "Search and retrieve past entries",
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="9.5" cy="9.5" r="5.5"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? "0.12" : "0"}
        />
        <path
          d="M13.5 13.5L18 18"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    ariaLabel: "Go to your profile and settings",
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="11" cy="7.5" r="3.5"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          fill={active ? "currentColor" : "none"}
          fillOpacity={active ? "0.12" : "0"}
        />
        <path
          d="M4 19c0-3.866 3.134-7 7-7s7 3.134 7 7"
          stroke="currentColor"
          strokeWidth={active ? "1.8" : "1.4"}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Hide nav on auth pages
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    return null;
  }

  return (
    <nav
      aria-label="Main navigation"
      role="navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100"
    >
      <ul
        role="list"
        className="flex items-center justify-around px-2 py-2"
      >
        {navItems.map(({ href, label, ariaLabel, icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <li key={href} role="listitem" className="flex-1">
              <Link
                href={href}
                aria-label={ariaLabel}
                aria-current={isActive ? "page" : undefined}
                className={`
                  flex flex-col items-center justify-center gap-1 py-1
                  rounded-xl transition-all duration-200 ease-out
                  min-h-[48px] w-full mx-auto
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  ${isActive
                    ? "text-blue-600"
                    : "text-gray-400 hover:text-gray-600 active:scale-95"
                  }
                `}
              >
                <span className="transition-transform duration-200">
                  {icon(isActive)}
                </span>
                <span
                  className={`text-[10px] font-medium leading-none tracking-wide transition-colors duration-200 ${
                    isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
