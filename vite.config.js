import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        svgr({
            svgrOptions: {
                // svgr options
            }
        })
    ],
    server: {
        host: 'localhost',
        port: 5173
    }
  });