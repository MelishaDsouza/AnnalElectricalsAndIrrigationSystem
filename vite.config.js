import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    sitemap({
      hostname: 'https://annalelectricals.in',
    }),
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    esbuild: {
      drop: ['console', 'debugger'],
      pure: ['console.log', 'console.info'],
      legalComments: 'none',
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'aos': ['aos'],
          'icons': ['react-icons', '@fortawesome/fontawesome-free'],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|tiff|bmp|ico|webp/.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff|woff2|ttf|otf|eot/.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    cssCodeSplit: true,
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'aos'],
    exclude: ['@vite/client'],
  },
  server: {
    headers: {
      'Cache-Control': 'max-age=31536000, immutable',
    },
  },
})
