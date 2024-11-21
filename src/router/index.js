import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '../views/SignUpView.vue';
import SignInView from '../views/SignInView.vue';
import AddTask from '@/components/AddTask.vue';
import EditTask from '@/components/EditTask.vue';
import { getCurrentUser } from '@/auth';
import TaskList from '@/components/TaskList.vue';

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
      component: TaskList,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/add-task',
      name: 'add-task',
      component: AddTask,
      props: true,
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
      next();
    } else {
      next('/sign-in');
    }
  } else {
    next();
  }
});

export default router;
