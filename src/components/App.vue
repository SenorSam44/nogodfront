<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    getPrimaryUserInfoWithoutAuth() {
      const tempToken = localStorage.getItem('access_token');
      const tempUser = {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        type: parseInt(localStorage.getItem('type'), 10),
      };
      axios.defaults.headers.Authorization = `Bearer ${tempToken}`;
      this.$store.commit('auth_success', {
        tempUser,
        tempToken,
      });
    },
  },
  created() {
    this.getPrimaryUserInfoWithoutAuth();
  },
};
</script>
