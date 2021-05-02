<template>
  <div id="general-navbar">
    <div class="top-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/deshi-uddokta">Deshi Uddokta</router-link>
      <router-link to="/furniture-customization">Furniture Customization</router-link>
      <router-link to="/books">Books</router-link>

    </div>
    <b-navbar class="navbar" toggleable="lg" type="dark" :class="panel">
      <burger-menu/>

      <b-navbar-brand to="/"> Brand</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse">
        <template #default="{ expanded }">
          <b-icon-chevron-up v-if="expanded" style="color: white"/>
          <b-icon-chevron-down v-else style="color: white"/>
        </template>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!--        <b-navbar-nav>-->
        <!--          <b-nav-item href="#">Link</b-nav-item>-->
        <!--          <b-nav-item href="#" disabled>Disabled</b-nav-item>-->
        <!--        </b-navbar-nav>-->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="nav-right ml-auto">
          <b-nav-item class="search-input">
            <b-input v-if="isSearchbarVisible" type="text"/>
          </b-nav-item>
          <b-nav-item class="search-button mr-2"
                      @click="showHideSearchBar">
            <b-icon-search font-scale="2"
                           style="width: 1.5rem; height: 1.5rem">
            </b-icon-search>
          </b-nav-item>

          <!--          <b-nav-item-dropdown text="Lang" right>-->
          <!--            <b-dropdown-item href="#">EN</b-dropdown-item>-->
          <!--            <b-dropdown-item href="#">ES</b-dropdown-item>-->
          <!--            <b-dropdown-item href="#">RU</b-dropdown-item>-->
          <!--            <b-dropdown-item href="#">FA</b-dropdown-item>-->
          <!--          </b-nav-item-dropdown>-->
          <b-nav-item
            v-if="!$store.getters.isLoggedIn" to="/register"
            right>
            Register
          </b-nav-item>

          <b-nav-item
            v-if="!$store.getters.isLoggedIn" to="/login"
            right>
            Log In
          </b-nav-item>

          <b-nav-item-dropdown v-if="$store.getters.isLoggedIn" class="text-capitalize" right>
            <template #button-content>
              {{
                $store.state.loginModule.user.name ?
                  $store.state.loginModule.user.name : $store.state.loginModule.user.first_name
              }}
            </template>
            <b-dropdown-item to="/me">Profile</b-dropdown-item>
            <b-dropdown-item
              @click="logingout">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import BurgerMenu from '@/components/menu/BurgerMenu.vue';

export default {
  name: 'GeneralNavBar',
  components: {
    BurgerMenu,
  },
  data() {
    return {
      isSearchbarVisible: true,
    };
  },
  props: {
    panel: {
      type: String,
      default: 'general',
    },
  },
  methods: {
    logingout() {
      this.$store.dispatch('logout', this.$store.state.user)
        .then(() => {
          let nextUrl = '/';
          if (this.$route.query.nextUrl != null) {
            nextUrl = this.$route.query.nextUrl;
          }
          this.$router.push(nextUrl)
            .catch(() => {
              this.$router.push('/');
            });
        });
    },
    autoHideNavbar() {
      let prevScrollpos = window.pageYOffset;
      window.onscroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          document.getElementById('general-navbar').style.top = '0';
        } else {
          document.getElementById('general-navbar').style.top = '-80px';
        }
        prevScrollpos = currentScrollPos;
      };
    },
  },
  mounted() {
    this.autoHideNavbar();
  },
};
</script>
