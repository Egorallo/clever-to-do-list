import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import SignUpView from '../views/SignUpView.vue';
import SignInView from '../views/SignInView.vue';
import AddTask from '@/components/AddTask.vue';
import EditTask from '@/components/EditTask.vue';
import { getCurrentUser } from '@/auth';

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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/add-task',
      name: 'add-task',
      component: AddTask,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/edit-task/:id',
      name: 'edit-task',
      component: EditTask,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      console.log('User is logged');
      next();
    } else {
      console.log('user is not loggedin');
      next('/sign-in');
    }
  } else {
    next();
  }
});

export default router;
