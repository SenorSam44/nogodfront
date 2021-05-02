<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-if="message!=null">message is {{ message }}</div>
    <button @click="getMessage"> click</button>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: null,
    };
  },
  methods: {
    getMessage() {
      const url = `${process.env.VUE_APP_API_URL}landing-page`;
      const token = localStorage.getItem('access_token');
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      axios.get(url).then((response) => {
        this.message = response.data;
      });
    },
  },
};
</script>

<style>

</style>
