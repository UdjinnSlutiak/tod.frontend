<template>
  <div style="margin: 2%; display: block; text-align: center;">
    <div class="create-container" :class="{ error: v$.title.$errors.length }" style="display: block !important;">
      <textarea v-model="title" class="create-text-field" placeholder="Topic Title"></textarea>
      <div style="color: red;" v-for="error of v$.title.$errors" :key="error.$uid">
            <label>{{ error.$message }}</label>
          </div>
    </div>
    <div class="create-container">
      <textarea @keyup.enter="addTag()" v-model="tagText" class="create-text-field" placeholder="Topic Tags"></textarea>
      <button @click="createTopic()" class="create-button">
        <span class="material-icons">send</span>
      </button>
    </div>
    <div v-if="tags.length == 0" style="width: 60%; margin: auto auto 0 auto;">
      <label style="color: indianred; margin: auto;">Note: press 'ENTER' after finishing each of your tags.</label>
    </div>
    <div v-else class="topic-tags" style="margin: 0 auto; width: 60%;">
      <div v-for="tag in tags" v-bind:key="tag" class="topic-tag" style="padding: 0.6%;">
        {{tag}}
      </div>
      <div class="topic-tag" style="padding: 0.6%; background-color: indianred;">
        <span @click="removeLastTag()" class="material-icons" style="font-size: inherit !important;">close</span>
      </div>
    </div>
    <div class="create-container text-danger">
      {{errorMessage}}
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import apiClient from "../services/apiClient";

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      title: "",
      tags: [],
      tagText: "",
      errorMessage: "",
    }
  },
  methods: {
    addTag: function () {
      if (!this.tagText) {
        return;
      }
      this.tagText = this.tagText.slice(0, -1);
      let filtered = this.tags.filter(tag => tag.toLowerCase() == this.tagText.toLowerCase());
      if (filtered.length > 0) {
        this.tagText = "";
        return;
      }

      this.tags.push(this.tagText);
      this.tagText = "";
    },
    removeLastTag() {
      if (this.tags.length > 0) {
        this.tags.pop();
      }
    },
    createTopic: async function () {
      if (!this.validate()) {
        return;
      }

      let response = await apiClient.createTopic({ 
        title: this.title,
        tags: this.tags,
      });

      if (typeof response != 'object')
      {
        this.errorMessage = response;
        return;
      }

      this.$router.push("/topic/" + response.id);
    },
    validate() {
      this.v$.$touch();

      if (this.v$.$invalid) {
        return false;
      }
      return true;
    },
  },
  validations() {
    return {
      title: {
        required: helpers.withMessage("Title is required", required),
        minLength: helpers.withMessage("Title has to be longer then 10 symbols", minLength(10)),
      }
    }
  }
}
</script>

<style>
.create-container {
  margin: 2% auto;
  display: flex; 
  height: 10%;
  width: 60%;
}
.create-text-field {
  border-radius: 10px;
  background-color: #F2ECFF;
  color: #00C896;
  width: 100%;
  padding: 1.5%;
  border: none;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: medium;
  resize: none;
  outline: none;
}
.create-button {
  border-radius: 10px;
  background-color: #00C896;
  color: #F2ECFF;
  width: 10%;
  border: none;
  margin-left: 5%;
  cursor: pointer;
}
.create-button:hover {
  background-color: #518071;
}
</style>