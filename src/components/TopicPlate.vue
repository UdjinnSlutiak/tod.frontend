<template>
  <div class="topic-plate" @click="this.openTopic(topicObject.id)">
    <div class="topic-title">
      {{topicObject.title}}
    </div>
    <div class="topic-tags">
      <div class="topic-tag" v-for="tag in topicObject.tags" v-bind:key="tag.usedCount">
        {{tag.text}}
      </div>
    </div>
    <div class="topic-info">
      <div style="display: flex; z-index: 10;">
        <div @click="react(topicObject.id, 1)" v-if="!userContent && authObject" class="text-success">
          <span class="material-icons">thumb_up</span>
        </div>
        <div v-bind:class="this.getRatingClass(topicObject.rating)" style="display: flex;">
          <span v-if="userContent || !authObject" style="margin-right: 8%;" class="material-icons">thumbs_up_down</span>
          {{topicObject.rating}}
        </div>
        <div @click="react(topicObject.id, -1)" v-if="!userContent && authObject" class="text-danger">
            <span class="material-icons">thumb_down</span>
        </div>
      </div>
      <div v-if="!userContent" style="text-align:right;">
        {{topicObject.author.username}} at {{getDateTime(topicObject.createdUtc)}}
      </div>
      <div v-else style="text-align:right;">
        me at {{getDateTime(topicObject.createdUtc)}}
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/apiClient";

export default {
  name: "topic-plate",
  mounted: async function () {
    this.userContent = this.currentUserContent(this.topicObject.author.username);
  },
  data() {
    return {
      userContent: false,
    }
  },
  methods: {
    getDateTime(date) {
      let dateTime = new Date(date);
      return dateTime.toLocaleString();
    },
    getRatingClass(rating) {
      if (rating > 0) {
        return 'text-success';
      }
      if (rating < 0) {
        return 'text-danger';
      }
      return '';
    },
    currentUserContent(ownerUsername) {
      if (!this.authObject) {
        return false;
      }
      return this.authObject.user.username == ownerUsername ? true : false;
    },
    openTopic: async function (id) {
      this.$router.push("/topic/" + id);
    },
    react: async function (id, value) {
      let response = await apiClient.reactOnTopic(id, value);
      return response == "OK" ? value : 0;
    },
  },
  props: {
    topicObject: {
      Type: Object,
    },
  },
  watch: {
    topicObject(newValue) {
      this.topic = newValue;
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
.topic-plate {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #4F4F4F;
  cursor: pointer;
  z-index: -1;
}
.topic-title {
  width: 100%;
  color: #F2ECFF;
  text-align: justify;
  padding: 1%;
  font-size:large;
}
.topic-tags {
  display: flex;
  margin-left: 1%;
}
.topic-tag {
  border-radius: 6px;
  background-color: #00C896;
  color:#F2ECFF;
  padding: 0.3%;
  margin: 0.3%;
  font-size:smaller;
}
.topic-info {
  display: flex;
  color:#F2ECFF;
  text-align: right;
  font-style: italic;
  opacity: 0.5;
  padding: 0 0.5% 1% 0;
  font-size:smaller;
  justify-content: space-between;
  margin: 1% 1%;
}
.text-success {
  color:greenyellow;
  opacity: 0.9 !important;
}
.text-danger {
  color:indianred;
  opacity: 0.9 !important;
}
</style>