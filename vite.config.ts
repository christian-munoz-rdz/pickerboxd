import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Example of defining build-time variables (uncomment to use):
  // define: {
  //   __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  //   __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  //   'import.meta.env.VITE_CUSTOM_VAR': JSON.stringify(process.env.CUSTOM_VAR || 'default'),
  // },
}) 