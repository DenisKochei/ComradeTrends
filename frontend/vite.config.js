import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Comrade Trends App',
        short_name: 'ComradeTrends',
        description: "Kenya's and the Globe's #1 news and entertainment website",
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icons/ComradeTrendsLogo1.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/ComradeTrendsLogo2.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ]
});
