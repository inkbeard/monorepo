import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
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
          meta: {
            title: 'Budget It',
          },
        },
        {
          path: '/gbt-mad-libs',
          name: 'GbtMadLibs',
          component: () => import('@/views/GbtMadLibsView.vue'),
          meta: {
            title: 'GBT Mad Libs',
          },
        },
        {
          path: '/icon-memory',
          name: 'IconMemory',
          component: () => import('@/views/IconMemoryView.vue'),
          meta: {
            title: 'Icon Memory',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

export default router;
