"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

// ⚠️ Make sure this path points exactly to your actions.ts file!
// e.g., "@/app/actions", "@/lib/actions", or wherever it is located.
import { signOut } from "@/app/auth/actions";

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
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all shadow-sm"
      >
        <span className="text-sm font-semibold text-blue-300">
          {username ? username.charAt(0).toUpperCase() : "?"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-14 w-52 bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-3 border-b border-white/10 bg-white/5">
            <p className="text-xs font-medium text-neutral-400">Signed in as</p>
            <p className="text-sm font-semibold text-neutral-100 truncate">{username}</p>
          </div>

          <div className="p-1.5 space-y-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <User className="w-4 h-4 text-blue-400" />
              View Profile
            </Link>

            <button
              type="button"
              onClick={async () => {
                await signOut(); 
              }}
              className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}