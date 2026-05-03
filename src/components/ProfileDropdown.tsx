"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

interface Props {
  username: string;
}

export function ProfileDropdown({ username }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open profile menu"
        className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center hover:border-neutral-500 transition-colors"
      >
        <span className="text-sm font-semibold text-neutral-200">
          {username.charAt(0).toUpperCase()}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg overflow-hidden z-50">
          
          {/* User info */}
          <div className="px-4 py-3 border-b border-neutral-800">
            <p className="text-md font-semibold text-neutral-200">{username}</p>
          </div>

          {/* Profile link */}
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-300 hover:bg-neutral-800 transition-colors"
          >
            <User className="w-4 h-4 text-neutral-500" />
            View Profile
          </Link>

          {/* Sign out */}
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-neutral-800 transition-colors border-t border-neutral-800"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>

        </div>
      )}
    </div>
  );
}