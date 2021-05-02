<template>
  <div id="general-custom-bars">
    <div class="nav-bar">
      <general-nav-bar/>
    </div>

    <sidebar>
      <ul class="sidebar-panel-nav">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">about</router-link>
        </li>
        <li v-if="!$store.getters.isLoggedIn">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!$store.getters.isLoggedIn">
          <router-link to="/register">Register</router-link>
        </li>
        <li>
          <router-link to="/business-with-us">Business with us</router-link>
        </li>
      </ul>
    </sidebar>
  </div>
</template>

<script>
import Sidebar from '@/components/menu/Sidebar.vue';
import GeneralNavBar from '@/components/menu/GeneralNavbar.vue';

export default {
  name: 'GeneralCustomerBars',
  components: {
    GeneralNavBar,
    Sidebar,
  },
};
</script>
