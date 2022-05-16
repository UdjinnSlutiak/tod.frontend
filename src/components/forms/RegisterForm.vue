<template>
  <div class="auth-container">
    <div>
      <h3 class="auth-header">Register if you are new here:</h3>

      <div class="auth-field" :class="{ error: v$.email.$errors.length }">
        <input v-model="email" class="auth-input" placeholder="Email" />
        <div style="color: red;" v-for="error of v$.email.$errors" :key="error.$uid">
          <label>{{ error.$message }}</label>
        </div>
      </div>
      <div class="auth-field" :class="{ error: v$.username.$errors.length }">
        <input v-model="username" class="auth-input" placeholder="Username" />
        <div style="color: red;" v-for="error of v$.username.$errors" :key="error.$uid">
          <label>{{ error.$message }}</label>
        </div>
      </div>
      <div class="auth-field" :class="{ error: v$.rPassword.$errors.length }">
        <input v-model="rPassword" class="auth-input" type="password" placeholder="Password"/>
        <div style="color: red;" v-for="error of v$.rPassword.$errors" :key="error.$uid">
          <label>{{ error.$message }}</label>
        </div>
      </div>
      <div class="auth-field" :class="{ error: v$.rPasswordRepeat.$errors.length }">
        <input v-model="rPasswordRepeat" class="auth-input" type="password" placeholder="Repeat Password"/>
        <div style="color: red;" v-for="error of v$.rPasswordRepeat.$errors" :key="error.$uid">
          <label>{{ error.$message }}</label>
        </div>
      </div>
      <div class="auth-field">
        <button class="auth-button" @click="this.submitForm()">Register</button>
      </div>
      <div v-if="apiException" class="auth-field" style="color: red; opacity: 0.8;">
        {{apiException}}
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs, helpers } from "@vuelidate/validators";

export default {
  name: "register-form",
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: "",
      username: "",
      rPassword: "",
      rPasswordRepeat: "",
    }
  },
  validations() {
    return {
      email: { 
        required: helpers.withMessage("Email is required", required), 
        email: helpers.withMessage("Invalid email", email),
      },
      username: { 
        required: helpers.withMessage("Username is required", required),
      },
      rPassword: { 
        required: helpers.withMessage("Password is required", required),
      },
      rPasswordRepeat: { 
        required: helpers.withMessage("Password repeat is required", required), 
        sameAs: helpers.withMessage("Passwords do not match", sameAs(this.rPassword)),
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

      let registerObject = {
        email: this.email,
        username: this.username,
        password: this.rPassword,
      };

      this.$emit("onRegisterSubmit", registerObject);
    },
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