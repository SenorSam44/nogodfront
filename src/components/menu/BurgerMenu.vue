<template>
  <div id="burger-menu"
       :class="{ 'active' : this.$store.state.isNavOpen }"
       @click.prevent="$store.commit('toggleNav')">
    <slot>
      <button type="button" class="burger-button" title="Menu">
        <span class="burger-bar burger-bar--1"></span>
        <span class="burger-bar burger-bar--2"></span>
        <span class="burger-bar burger-bar--3"></span>
      </button>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'BurgerMenu',
};
</script>
