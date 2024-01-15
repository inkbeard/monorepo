import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Homeview.vue'),
    },
    {
      path: '/resume',
      name: 'Resume',
      component: () => import('@/views/ResumeView.vue'),
    },
    {
      path: '/projects',
      name: 'Projects',
      children: [
        {
          path: '/budget-it',
          name: 'BudgetIt',
          component: () => import('@/views/BudgetItView.vue'),
        },
        {
          path: '/gbt-mad-libs',
          name: 'GbtMadLibs',
          component: () => import('@/views/GbtMadLibsView.vue'),
        },
        {
          path: '/icon-memory',
          name: 'IconMemory',
          component: () => import('@/views/IconMemoryView.vue'),
        },
      ],
    },
  ],
});

export default router;
