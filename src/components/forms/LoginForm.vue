<template>
  <div class="auth-container">
      <div>
        <h3 class="auth-header">Login if you already have an account:</h3>

        <div class="auth-field" :class="{ error: v$.login.$errors.length }">
          <input v-model="login" class="auth-input" placeholder="Email or Username" />
          <div style="color: red;" v-for="error of v$.login.$errors" :key="error.$uid">
            <label>{{ error.$message }}</label>
          </div>
        </div>
        <div class="auth-field" :class="{ error: v$.lPassword.$errors.length }">
          <input v-model="lPassword" class="auth-input" type="password" placeholder="Password"/>
          <div style="color: red;" v-for="error of v$.lPassword.$errors" :key="error.$uid">
            <label>{{ error.$message }}</label>
          </div>
        </div>
        <div class="auth-field">
          <button class="auth-button" @click="this.submitForm()">Login</button>
        </div>
        <div v-if="apiException" class="auth-field" style="color: red; opacity: 0.8;">
          {{apiException}}
        </div>
      </div>
    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  name: "login-form",
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      login: "",
      lPassword: "",
    }
  },
  validations() {
    return {
      login: { 
        required: helpers.withMessage("Login is required", required),
      },
      lPassword: { 
        required: helpers.withMessage("Password is required", required),
      },
    }
  },
  methods: {
    validate: function () {
      this.v$.$touch();

      if (this.v$.$invalid) {
        return false;
      }
      return true;
    },
    submitForm: function () {
      if (!this.validate())
      {
        return;
      }

      let loginObject = {
        login: this.login,
        password: this.lPassword,
      };

      this.$emit("onLoginSubmit", loginObject);
    }
  },
  props: {
    apiException: {
      Type: String,
    },
  },
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