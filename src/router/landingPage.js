const landingPageRoutes = [
  {
    path: '/',
    name: 'Homepage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/pages/landingPage/HomePage'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/pages/landingPage/Register.vue'),
  },
  {
    path: '/business-with-us',
    name: 'BusinessWithUs',
    component: () => import('../components/pages/landingPage/BusinessWithUs.vue'),
  },
  {
    path: '/be-a-merchant',
    name: 'BeAMerchant',
    component: () => import('../components/pages/landingPage/BeAMerchant.vue'),
  },
  {
    path: '/be-a-local-entrepreneur',
    name: 'BeAMerchant',
    component: () => import('../components/pages/landingPage/BeALocalEntrepreneur.vue'),
  },
  {
    path: '/be-a-book-seller',
    name: 'BeAMerchant',
    component: () => import('../components/pages/landingPage/BeABookSeller.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/pages/landingPage/Login.vue'),
  },
  {
    path: '/seller-login',
    name: 'SellerLogin',
    component: () => import('../components/pages/landingPage/SellerLogin.vue'),
  },
];

export default landingPageRoutes;
