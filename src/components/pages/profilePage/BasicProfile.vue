<template>
  <div>
    <h1>My Profile</h1>
    <p>Name: {{user.name}} </p>
    <p>Email: {{user.email}} </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BasicProfile',
  data() {
    return {
      user: null,
    };
  },
  methods: {
    getProfileInfo() {
      const url = `${process.env.VUE_APP_API_URL}basic-profile`;
      let type;
      switch (this.$store.state.loginModule.user.type) {
        case 1:
          type = 'admin';
          break;
        case 2:
          type = 'merchant';
          break;
        case 3:
          type = 'user';
          break;
        case 4:
          type = 'local_entrepreneur';
          break;
        case 5:
          type = 'book_seller';
          break;
        default:
          type = '0';
          break;
      }

      axios.get(url, {
        params: {
          type,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
        })
        .catch(() => {
          this.route.push({
            path: 'login',
            query: {
              nextUrl: '/me',
            },
          });
        });
    },
  },
  mounted() {
    this.getProfileInfo();
  },
};
</script>

<style scoped>

</style>
