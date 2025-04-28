import { createApp } from 'vue';
import { createVuetify } from 'vuetify';  // Correct way to import Vuetify 3
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import 'vuetify/styles';  // Import Vuetify styles
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import App from './App.vue';
import router from './router';
import injectBridgeMockInDev from './mock/injectBridgeMockInDev.js';

// Inject the mock for Bridge in development mode
injectBridgeMockInDev();

// Log to check if Bridge is available in window
console.log('@main: !!window.Bridge:', !!window.Bridge);

// Create the Vue app using Vue 3
const app = createApp(App);

// Create a Vuetify instance
const vuetify = createVuetify({icons: {
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
}}); // Correct way to initialize Vuetify 3

// Use Vuetify and the router
app.use(vuetify);
app.use(router);

// Define the Bridge as a global property
app.config.globalProperties.$Bridge = window.Bridge;

// Mount the app to the DOM
app.mount('#app');
