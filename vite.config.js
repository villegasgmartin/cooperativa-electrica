import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Cooperativa',
        short_name: 'Cooperativa',
        description: 'Sistema de gestión de Cooperativa',

        theme_color: '#ffffff',
        background_color: '#ffffff',

        display: 'standalone',

        start_url: '/',
        scope: '/',

        icons: [
          {
            src: 'https://res.cloudinary.com/dj3akdhb9/image/upload/v1791193312/favicon-cooperativa_tq4glc.jpg',
            sizes: '192x192',
            type: 'image/jpg',
          },
          {
            src: 'https://res.cloudinary.com/dj3akdhb9/image/upload/v1791193312/favicon-cooperativa_tq4glc.jpg',
            sizes: '512x512',
            type: 'image/jpg',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],

  optimizeDeps: {
    include: [
      '@mui/x-date-pickers',
      '@mui/material',
      '@mui/lab',
      '@mui/icons-material',
      'days.js',
    ],
  },
})