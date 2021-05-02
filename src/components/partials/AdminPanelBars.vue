<template>
  <div id="admin-panel-bars">
    <div class="nav-bar">
        <general-nav-bar panel="admin"/>
    </div>
    <sidebar panel="admin">
      <ul class="sidebar-panel-nav">
        <li><router-link to="/admin/dashboard">DashBoard</router-link></li>
        <li>
          <router-link to="/admin/productboard">Product Board</router-link>
        </li>
        <li>
          <router-link to="/admin/merchant-requests">Merchant Requests</router-link>
        </li>

      </ul>
    </sidebar>
  </div>
</template>

<script>
import Sidebar from '@/components/menu/Sidebar.vue';
import GeneralNavBar from '@/components/menu/GeneralNavbar.vue';

export default {
  name: 'AdminPanelBars',
  components: { GeneralNavBar, Sidebar },
};
</script>
