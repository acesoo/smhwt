import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// 1. Move theme and status bar to Viewport (Next.js standard)
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // Better for modern mobile screens
};

export const metadata: Metadata = {
  title: "Wellness Tracker",
  description: "A safe, anonymous space to log your daily wellbeing...",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Wellness Tracker",
    startupImage: "/icons/icon-512x512.png", // Added for better PWA feel
  },
  icons: {
    icon: [
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased font-sans",
        geistSans.variable,
        geistMono.variable,
        figtree.variable,
      )}
    >
      {/* 2. REMOVE the manual <head> tags. Next.js handles them via metadata above. */}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}