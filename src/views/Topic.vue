<template>
  <div style="margin: 2%;">
    <topic-plate v-if="topic" :topicObject="topic" :topicReaction="topicReaction"></topic-plate>

    <div style="margin-top: 2%; overflow-y: auto;" v-for="commentary in commentaries" v-bind:key="commentary.id">
      <commentary :commentaryObject="commentary" :userCommentaryReaction="getCommentaryReaction(commentary.id)"></commentary>
    </div>

    <div v-if="authObject" class="container">
      <textarea v-model="commentaryText" class="text-field"></textarea>
      <button @click="createCommentary" class="send-button">
        <span class="material-icons">send</span>
      </button>
    </div>
  </div>
</template>

<script>
import TopicPlate from "../components/TopicPlate.vue";
import Commentary from "../components/Commentary.vue";
import apiClient from "../services/apiClient";

export default {
  components: {
    TopicPlate,
    Commentary,
  },
  created: async function () {
    this.topicId = this.$route.params.id;

    await this.getTopic();
    await this.getTopicReaction();
    await this.getCommentaries();
    await this.getCommentariesReactions();
  },
  data() {
    return {
      topicId: 0,
      topic: null,
      topicReaction: {},
      commentaries: [],
      commentaryText: "",
      commentariesReactions: [],
    }
  },
  methods: {
    getTopic: async function () {
      let response = await apiClient.getTopic(this.topicId);
      if (typeof response == 'object') {
        this.topic = response;
      }
    },
    getTopicReaction: async function() {
      if (!this.authObject) {
        return;
      }

      let response = await apiClient.getUserTopicReaction(this.topicId);
      if (response) {
        this.topicReaction = response;
      }
    },
    getCommentaries: async function () {
      let response = await apiClient.getTopicCommentaries(this.topicId);
      
      if (typeof response == 'object') {
        this.commentaries = response.commentaries;
      }
    },
    getCommentariesReactions: async function () {
      if (!this.authObject) {
        return;
      }

      let response = await apiClient.getUserCommentariesReaction(this.topicId);
      if (response) {
        this.commentariesReactions = response.reactions;
      }
    },
    getCommentaryReaction: function (id) {
      let reaction = this.commentariesReactions.filter(reaction => reaction.id == id)[0];
      console.log(reaction);
      return reaction;
    },
    createCommentary: async function () {
      let response = await apiClient.createCommentary(this.topicId, { text: this.commentaryText });
      if (response) {
        this.commentaryText = "";
        this.commentaries.push(response);
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
.container {
  margin: 2% 0;
  display: flex; 
  height: 10%;
  width: 100%;
}
.text-field {
  border-radius: 10px 0 0 10px;
  background-color: #F2ECFF;
  color: #00C896;
  width: 95%;
  padding: 1.5%;
  border: none;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: medium;
  resize: none;
  outline: none;
}
.send-button {
  border-radius: 0 10px 10px 0;
  background-color: #00C896;
  color: #F2ECFF;
  width: 5%;
  border: none;
}
.send-button:hover {
  background-color: #518071;
}
</style>