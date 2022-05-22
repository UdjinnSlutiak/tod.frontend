<template>
  <div style="display: flex; margin: 5% 10%;">
    <register-form @onRegisterSubmit="register" :apiException="registerException"></register-form>

    <login-form @onLoginSubmit="login" :apiException="loginException"></login-form>
  </div>
</template>

<script>
import LoginForm from "../components/forms/LoginForm.vue";
import RegisterForm from "../components/forms/RegisterForm.vue";
import authenticationService from "../services/authenticationService";

export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      registerException: "",
      loginException: "",
    }
  },
  methods: {
    register: async function (registerObject) {
      try {
        await authenticationService.register(registerObject);
      } catch (error) {
        this.registerException = error.text;
        return;
      }

      this.$router.push("/feed");
    },
    login: async function (loginObject) {
      try {
        await authenticationService.login(loginObject.login, loginObject.password);
      } catch (error) {
        this.loginException = JSON.parse(error.text);
        return;
      }

      this.$router.push("/feed");
    }
  }
}
</script>

<style>
.auth-container {
  margin: auto 4%;
  width:50%;
  border-radius: 10px;
  background-color: #4F4F4F;
}
.auth-header {
  text-align: center;
  color: #00C896;
}
.auth-field {
  text-align: center;
  margin-bottom: 4%;
}
.auth-input {
  color: #00C896;
  background-color: #F2ECFF;
  border-radius: 10px;
  padding: 2% 2%;
  font-size: large;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border: none;
  outline: none;
}
.auth-button {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: large;
  text-transform: uppercase;
  border-radius: 10px;
  background-color: #00C896;
  color: #F2ECFF;
  border: none;
  padding: 2% 4%;
}
.auth-button:hover {
  background-color: #518071;
}
</style>