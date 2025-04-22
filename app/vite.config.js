// Mengimpor fungsi `defineConfig` dari Vite untuk mendefinisikan konfigurasi proyek
import { defineConfig } from 'vite';

// Mengimpor plugin React resmi dari Vite, mendukung fitur seperti JSX dan Fast Refresh
import react from '@vitejs/plugin-react';

// Mengimpor fungsi `resolve` dari modul path untuk mengatur alias jalur absolut
import { resolve } from 'path';

// Mengekspor konfigurasi Vite menggunakan `defineConfig` untuk mempermudah validasi dan autocompletion
export default defineConfig({
  // Menambahkan plugin React ke dalam pipeline build Vite
  plugins: [react()],

  // Konfigurasi resolusi modul untuk proyek
  resolve: {
    // Menambahkan alias untuk jalur absolut
    alias: {
      // Alias `@` diarahkan ke folder `./src` dalam proyek
      // Contoh: '@/components/MyComponent' -> './src/components/MyComponent'
      '@': resolve(__dirname, './src'),
    },
  },
});
