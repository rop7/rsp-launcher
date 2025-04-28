import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
          script: {
            defineModel: true
          }
        }),
        vuetify()
      ],
      pluginOptions: {
        vuetify: {
          // vuetify-loader options
          theme: {
            dark: false,
            themes: {
              light: {
                primary: '#4caf50',
                secondary: '#f1f1f1',
                accent: '#ff9800',
                error: '#f44336',
              },
              dark: {
                primary: '#4caf50',
                secondary: '#f1f1f1',
                accent: '#ff9800',
                error: '#f44336',
              },
            },
          },
        },
      },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
})
