import withPWA from "@ducanh2912/next-pwa";

const nextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  reloadOnOnline: true,
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    disableDevLogs: true,
    // Add this to prevent Service Worker navigation loops
    navigationPreload: false,
    runtimeCaching: [
      {
        // Force all page navigations to go to the Network ONLY
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "NetworkOnly",
      },
      {
        // App pages — network first, fall back to cache
        urlPattern:
          /^\/(dashboard|log|journal|goals|search|stories|profile|admin|resources)/,
        handler: "NetworkFirst",
        options: {
          cacheName: "pages-cache",
          networkTimeoutSeconds: 10,
        },
      },
      {
        // Static assets — cache first
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
      },
    ],
  },
})({
  // Your other Next.js config here
});

export default nextConfig;
