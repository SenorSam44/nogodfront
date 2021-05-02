<template>
  <div class="profile-page">
    <general-customer-bars/>
    <div :class="$store.state.isNavOpen? 'main-content-short': 'main-content-long'"
         class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GeneralCustomerBars from '@/components/partials/GeneralCustomerBars.vue';

export default {
  name: 'ProfilePage',
  components: { GeneralCustomerBars },
  methods: {
  },
};
</script>
