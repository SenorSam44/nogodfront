<template>
  <div class="admin-panel">
    <admin-panel-bars/>
    <div :class="$store.state.isNavOpen? 'main-content-short': 'main-content-long'"
         class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminPanelBars from '@/components/partials/AdminPanelBars.vue';

export default {
  name: 'AdminPanel',
  components: { AdminPanelBars },
  props: {
    panel: {
      type: String,
      default: 'general',
    },
  },
  methods: {
  },
};
</script>
