<template>
  <div class="navbar">
    <div class="navbar-container" style="text-align: left;">
      <router-link to="/" class="nav-item nav-item-left">
        <span class="material-icons">home</span>
      </router-link>
      <router-link to="/feed" class="nav-item nav-item-left">
        <span class="material-icons">dashboard</span>
      </router-link>
      <router-link to="" class="nav-item nav-item-left" v-if="authObject">
        <span class="material-icons">bookmarks</span>
      </router-link>
      <router-link to="" class="nav-item nav-item-left" v-if="authObject">
        <span class="material-icons">question_answer</span>
      </router-link>
      <router-link to="" class="nav-item nav-item-left" v-if="authObject">
        <span class="material-icons">post_add</span>
      </router-link>
      <router-link to="" class="nav-item nav-item-left" v-if="authObject">
        <span class="material-icons">article</span>
      </router-link>
      <router-link to="" class="nav-item nav-item-left">
        <span class="material-icons">search</span>
      </router-link>
    </div>
    <div class="navbar-container" style="text-align: right;">
      <router-link to="" class="nav-item nav-item-right" v-if="authObject">
        <span class="material-icons">account_circle</span>
      </router-link>
      <router-link @click="logout" to="" class="nav-item nav-item-right" v-if="authObject">
        <span class="material-icons">logout</span>
      </router-link>
      <router-link to="/login" class="nav-item nav-item-right" v-if="!authObject">
        <span class="material-icons">login</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import authenticationService from "../services/authenticationService";


export default {
  name: "navbar",
  mounted: async function () {
  },
  data() {
    return {
    }
  },
  methods: {
    logout: async function () {
      await authenticationService.logout();
      this.$router.push("/login");
    },
  },
  computed: {
    authObject() {
      return this.$store.state.authObject;
    },
  },
}
</script>

<style>
.navbar {
  display:flex;
  justify-content: space-between;
  background-color: #4F4F4F;
  text-transform: uppercase;
  padding: 1% 2%;
}
.navbar-container {
  display: flex;
}
.nav-item-left {
  margin: 0 20% 0 0;
  text-decoration: none;
}
.nav-item-right {
  margin: 0 0 0 0;
  text-decoration: none;
}
.nav-item:hover {
  color: #00C896;
}
.nav-item {
  color: #F2ECFF;
}
</style>