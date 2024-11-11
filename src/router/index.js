import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import SignUpView from '../views/SignUpView.vue';
import SignInView from '../views/SignInView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-up',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
  ],
});

export default router;
