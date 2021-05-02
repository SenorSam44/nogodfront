import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminPanel from '@/components/views/AdminPanel.vue';
import adminPanelRoutes from '@/router/adminPanel';
import ProfilePage from '@/components/views/ProfilePage.vue';
import profilePageRoutes from '@/router/profilePage';
import LandingPage from '../components/views/LandingPage.vue';
import landingPageRoutes from './landingPage';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
    children: landingPageRoutes,
  },
  {
    path: '/me',
    name: 'Profile',
    component: ProfilePage,
    children: profilePageRoutes,
    meta: {
      requireslAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/views/About.vue'),
    meta: {
      requiresGeneralAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AdminPanel,
    children: adminPanelRoutes,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresGeneralAuth)) {
    if (store.getters.isGeneralLoggedIn) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          nextUrl: to.fullPath,
        },
      });
    }
  } else if (to.matched.some((record) => record.meta.requiresAdminAuth)) {
    if (store.getters.isAdminLoggedIn) {
      next();
    } else {
      next({
        path: '/admin/login',
        query: {
          nextUrl: to.fullPath,
        },
      });
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          nextUrl: to.fullPath,
        },
      });
    }
  } else {
    next();
  }
});

export default router;
