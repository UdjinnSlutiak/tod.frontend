<template>
  <div style="margin: 1% 2% 2% 2%;">
    <div class="profile-plate">
      <div style="padding: 3%; margin: auto 0;">
        <div class="profile-info-container">
          <label class="profile-info-header">Username:</label>
          <label class="profile-info-value">{{me.username}}</label>
        </div>
        <div class="profile-info-container">
          <label class="profile-info-header">Email:</label>
          <label class="profile-info-value">{{me.email}}</label>
        </div>
        <div class="profile-info-container">
          <label class="profile-info-header">Rating:</label>
          <label class="profile-info-value">{{me.rating}}</label>
        </div>
      </div>
      <div style="padding: 3%; margin: auto 0;">
        <div class="profile-info-container">
          <label class="profile-info-header">Photo:</label>
          <img v-if="me.photoUrl" :src="me.photoUrl" />
          <span v-else class="material-icons profile-info-value" style="font-size: 96px;">account_circle</span>
        </div>
      </div>
      <div style="padding: 3%;">
        <div style="display: flex;">
          <textarea @keyup.enter="addTag()" v-model="tagText" class="profile-text-field" placeholder="Interests Tags"></textarea>
          <button @click="updateInterestTags()" class="save-button">
            <span class="material-icons">save</span>
          </button>
        </div>
        <div v-if="tags.length == 0" style="margin: auto auto 0 auto;">
          <label style="color: indianred; margin: auto;">Note: press 'ENTER' after finishing each of your tags.</label>
        </div>
        <div v-else class="topic-tags" style="width: 60%;">
          <div v-for="tag in tags" v-bind:key="tag" class="topic-tag" style="padding: 1.5%; margin: 1.5%;">
            {{tag.text}}
          </div>
          <div class="topic-tag" style="background-color: indianred;">
            <span @click="removeLastTag()" class="material-icons" style="font-size: inherit !important; margin:auto; padding: 0.5% 1.5%;">close</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../services/apiClient';

export default {
  mounted: async function () {
    await this.getMe();
    await this.getInterestTags();
  },
  data() {
    return {
      me: {},
      tags: [],
      tagText: "",
    }
  },
  methods: {
    getMe: async function () {
      let response = await apiClient.getMe();

      if (response) {
        this.me = response;
      }
    },
    addTag: function () {
      if (!this.tagText) {
        return;
      }
      this.tagText = this.tagText.slice(0, -1);
      let filtered = this.tags.filter(tag => tag.text.toLowerCase() == this.tagText.toLowerCase());
      if (filtered.length > 0) {
        this.tagText = "";
        return;
      }

      let newTag = {
        id: 0,
        text: this.tagText,
        usedCount: 0,
        userId: 0,
        status: 0,
      };

      this.tags.push(newTag);
      this.tagText = "";
    },
    removeLastTag() {
      if (this.tags.length > 0) {
        this.tags.pop();
      }
    },
    getInterestTags: async function () {
      let response = await apiClient.getUserInterestTags();
      if (response) {
        this.tags = response.tags;
      }
    },
    updateInterestTags: async function () {
      this.tagText = "";
      let tagsText = [];
      this.tags.forEach(element => {
        tagsText.push(element.text);
      });

      let response = await apiClient.updateUserInterestTags({ tagsText: tagsText });
      if (response) {
        this.tags = response.tags;
      }
    }
  },
}
</script>

<style>
.profile-plate {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #4F4F4F;
  display: flex;
}
.profile-info-header {
  color: #00C896;
  font-size: large;
  margin: auto 0;
}
.profile-info-container {
  display: flex;
  padding: 5%;
}
.profile-info-value {
  color: #F2ECFF;
  font-size: large;
  margin-left: 1.5%;
}
.profile-text-field {
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
.save-button {
  border-radius: 10px;
  background-color: #00C896;
  color: #F2ECFF;
  width: 20%;
  border: none;
  margin-left: 5%;
  cursor: pointer;
}
.save-button:hover {
  background-color: #518071;
}
</style>