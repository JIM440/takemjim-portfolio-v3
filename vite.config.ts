import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  build: {
    // Optimize chunk size for better Core Web Vitals
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['react-bootstrap-icons'],
        },
        // Optimize asset file names for caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    // Optimize assets
    assetsInlineLimit: 4096, // Inline small assets
    // Enable source maps for debugging (disable in production for better performance)
    sourcemap: false,
    // Target modern browsers for smaller bundle
    target: 'es2015',
    // CSS code splitting
    cssCodeSplit: true,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-bootstrap-icons'],
    // Pre-bundle dependencies
    esbuildOptions: {
      target: 'es2015',
    },
  },
})
