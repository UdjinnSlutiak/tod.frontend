<template>
  <div class="navbar">
    <div class="navbar-container" style="text-align: left;">
      <router-link active-class="active-item" to="/" class="nav-item nav-item-left">
        <span class="material-icons">home</span>
      </router-link>
      <router-link active-class="active-item" to="/feed" class="nav-item nav-item-left">
        <span class="material-icons">dashboard</span>
      </router-link>
      <router-link active-class="active-item" to="/search" class="nav-item nav-item-left">
        <span class="material-icons">search</span>
      </router-link>
    </div>
    <div class="navbar-container" style="text-align: right;">
      <router-link @click="showTopicForm = true;" :class="{'active-item': showTopicForm}" to="" class="nav-item nav-item-right" v-if="authObject">
        <span class="material-icons">post_add</span>
      </router-link>
      <router-link active-class="active-item" to="/profile" class="nav-item nav-item-right" v-if="authObject">
        <span class="material-icons">manage_accounts</span>
      </router-link>
      <router-link @click="logout" to="" class="nav-item nav-item-right" v-if="authObject">
        <span class="material-icons">logout</span>
      </router-link>
      <router-link active-class="active-item" to="/login" class="nav-item nav-item-right" v-if="!authObject">
        <span class="material-icons">login</span>
      </router-link>
    </div>
  </div>
  <topic-form v-if="showTopicForm" :isCreating="true" @onTopicFormConfirmed="topicFormConfirmed"></topic-form>
</template>

<script>
import authenticationService from "../services/authenticationService";
import TopicForm from "./forms/TopicForm.vue";

export default {
  name: "navbar",
  components: {
    TopicForm,
  },
  mounted: async function () {
  },
  data() {
    return {
      showTopicForm: false,
    }
  },
  methods: {
    logout: async function () {
      await authenticationService.logout();
      this.$router.push("/login");
    },
    topicFormConfirmed: function (result) {
      this.showTopicForm = false;
      if (result) {
        this.$router.push("/topic/" + result);
      }
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
.active-item {
  color: #00C896;
}
</style>