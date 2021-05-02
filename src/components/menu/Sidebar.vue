<template>
  <div id="sidebar">
<!--    <div class="sidebar-backdrop" @click="$store.commit('toggleNav')"-->
<!--         v-if="this.$store.state.isNavOpen">-->
<!--    </div>-->
    <transition name="slide">
      <div v-if="this.$store.state.isNavOpen"
           class="sidebar-panel" :class="panel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    panel: {
      type: String,
      default: 'general',
    },
  },
};
</script>
