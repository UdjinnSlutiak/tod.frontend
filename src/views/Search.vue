<template>
  <div style="margin: 1% 2% 2% 2%;">
    <div class="search-plate">
      <div style="display: flex;">
        <div class="search-field-container">
          <input v-model="title" class="search-input" type="text" placeholder="Title"/>
        </div>
        <div class="search-field-container">
          <input v-model="author" class="search-input" type="text" placeholder="Author"/>
        </div>
        <div class="search-field-container">
          <input @keyup.enter="addTag()" v-model="tagText" class="search-input" type="text" placeholder="Tags"/>
          <div v-if="tags.length == 0" style="margin: auto auto 0 auto;">
            <label style="color: indianred; margin: auto;">Note: press 'ENTER' after finishing each of your tags.</label>
          </div>
          <div v-else class="topic-tags" >
            <div v-for="tag in tags" v-bind:key="tag" class="topic-tag" style="padding: 0.6%;">
              {{tag}}
            </div>
            <div class="topic-tag" style="padding: 0.6%; background-color: indianred;">
              <span @click="removeLastTag()" class="material-icons" style="font-size: inherit !important;">close</span>
            </div>
          </div>
        </div>
        <div class="search-button-container">
          <button @click="search()" class="search-button">
            <span class="material-icons">search</span>
          </button>
        </div>
      </div>
    </div>
    <div style="margin: 1% 0;">
      <div v-if="noSearchResult" class="text-danger" style="text-align: center;">
        <h4>{{errorMessage}}</h4>
      </div>
      <div v-for="topic in topics" v-bind:key="topic.id">
        <topic-plate :topicObject="topic" style="margin-bottom: 1%;"></topic-plate>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../services/apiClient';
import TopicPlate from "../components/TopicPlate.vue";

export default {
  components: {
    TopicPlate,
  },
  data() {
    return {
      title: "",
      author: "",
      tags: [],
      tagText: "",
      topics: [],
      noSearchResult: false,
      errorMessage: "No topics found by such filters"
    }
  },
  methods: {
    addTag: function () {
      if (!this.tagText) {
        return;
      }
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
    search: async function () {
      let response = {};
      try {
        response = await apiClient.searchTopics({ 
          title: this.title, 
          author: this.author, 
          tags: this.tags 
        });
      }
      catch (error) {
        this.topics = [];
        this.errorMessage = error.text;
        this.noSearchResult = true;
        return;
      }

      if (response) {
        this.noSearchResult = false;
        this.topics = response.topics;
        return;
      }
      this.noSearchResult = true;
      this.topics = [];
    }
  }
}
</script>

<style>
.search-plate {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #4F4F4F;
}
.search-field-container {
  padding: 2%;
  width: 30%;
}
.search-button-container {
  padding: 2%;
  width: 10%;
}
.search-input {
  color: #00C896;
  background-color: #F2ECFF;
  border-radius: 10px;
  padding: 4%;
  font-size: medium;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border: none;
  outline: none;
}
.search-button {
  border-radius: 10px;
  background-color: #00C896;
  color: #F2ECFF;
  border: none;
  cursor: pointer;
  padding: 10%;
}
.search-button:hover {
  background-color: #518071;
}
</style>