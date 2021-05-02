const adminPanelRoutes = [
  {
    path: '',
    name: 'AdminHome',
    redirect: 'dashboard',
  },
  {
    path: 'dashboard',
    name: 'AdminDashBoard',
    component: () => import(/* webpackChunkName: "Register" */ '../components/pages/adminPanel/DashBoard.vue'),
    meta: {
      requiresAdminAuth: true,
    },
  },
  {
    path: 'productboard',
    name: 'ProductBoard',
    component: () => import(/* webpackChunkName: "Login" */ '../components/pages/adminPanel/ProductBoard.vue'),
    meta: {
      requiresAdminAuth: true,
    },
  },
  {
    path: 'merchant-requests',
    name: 'MerchantRequests',
    component: () => import(/* webpackChunkName: "Login" */ '../components/pages/adminPanel/MerchantRequests.vue'),
    meta: {
      requiresAdminAuth: true,
    },
  },
  {
    path: 'login',
    name: 'AdminLogin',
    component: () => import(/* webpackChunkName: "Register" */ '../components/pages/adminPanel/Login.vue'),
  },
];

export default adminPanelRoutes;
