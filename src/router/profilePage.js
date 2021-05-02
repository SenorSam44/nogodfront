const profilePageRoutes = [
  {
    path: '/',
    name: 'ProfileHome',
    // component: () => import('../components/pages/landingPage/HomePage'),
    redirect: 'profile',
  },
  {
    path: 'profile',
    name: 'Profile',
    component: () => import('../components/pages/profilePage/BasicProfile.vue'),
  },
];

export default profilePageRoutes;
