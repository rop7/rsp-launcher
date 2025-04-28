import { 
  createRouter, 
  createWebHistory } from 'vue-router';  // Correct import

import Home from '@/pages/Home.vue';

// Define routes
const routes = [
  {
    path: '/',
    component: Home
  }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),  // Uses HTML5 history mode
  routes
});

export default router;
