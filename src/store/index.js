import Vue from 'vue';
import Vuex from 'vuex';
import loginModule from '@/store/loginStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavOpen: true,
  },
  mutations: {
    toggleNav() {
      this.state.isNavOpen = !this.state.isNavOpen;
      return this.state.isNavOpen;
    },
  },
  actions: {},
  modules: { loginModule },
});
