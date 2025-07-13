import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    framer: ['framer-motion'],
                    utils: ['react-router-dom']
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.')
                    const ext = info[info.length - 1]
                    if (/\.(css)$/.test(assetInfo.name)) {
                        return `assets/css/[name]-[hash].${ext}`
                    }
                    if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
                        return `assets/images/[name]-[hash].${ext}`
                    }
                    return `assets/[name]-[hash].${ext}`
                }
            }
        },
        chunkSizeWarningLimit: 1000,
        target: 'es2015'
    },
    server: {
        port: 3000,
        host: true,
        open: true
    },
    preview: {
        port: 4173,
        host: true
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion']
    },
    css: {
        devSourcemap: false
    }
})