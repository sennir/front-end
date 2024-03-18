// vite.config.js
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // List your html files here, e.g:
        main: resolve(__dirname, 'index.html'),
        mainpage: resolve(__dirname, 'main-page.html'),
        createuser: resolve(__dirname, 'create-user-page.html'),
        oldentries: resolve(__dirname, 'old-entries-page.html')
      },
    },
  },
  // Public base path could be set here too:
  // base: '/~username/my-app/',
});