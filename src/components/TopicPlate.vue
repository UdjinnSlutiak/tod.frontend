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
          <span class="material-icons reaction" :class="{'reacted': reactedPositive && reacted}">thumb_up</span>
        </div>
        <div :class="{'text-success': rating > 0, 'text-danger': rating < 0}" style="display: flex; margin: 0 10%;">
          <span v-if="userContent || !authObject" class="material-icons">thumbs_up_down</span>
          {{rating}}
        </div>
        <div @click="react(topicObject.id, -1)" v-if="!userContent && authObject" class="text-danger">
            <span class="material-icons reaction" :class="{'reacted': !reactedPositive && reacted}">thumb_down</span>
        </div>
        <div @click="addToFavorites()" v-if="!userContent && authObject && !isInFavorite" style="margin: 0 15%;">
            <span class="material-icons">bookmark_add</span>
        </div>
        <div v-if="!userContent && authObject && isInFavorite" class="text-success" style="margin: 0 15%;">
            <span class="material-icons">bookmark_added</span>
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
    this.rating = this.topicObject.rating;
    this.isInFavorite = this.topicObject.isInFavorite;
    
    if (this.authObject && !this.userContent) {
      await this.getReaction();
    }
  },
  data() {
    return {
      userContent: false,
      rating: 0,
      isInFavorite: false,
      reactedPositive: false,
      reacted: false,
    }
  },
  methods: {
    getDateTime(date) {
      let dateTime = new Date(date);
      return dateTime.toLocaleString();
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
      let response;
      try {
        response = await apiClient.reactOnTopic(id, value);
      } catch (error) {
        return;
      }
      
      if (response != "OK") {
        return;
      }
      this.rating += value;
      console.log(this.reaction);
      if (this.reaction) {
        this.rating += this.reaction.reacted ? value : 0;
        this.reacted = true;
        this.reactedPositive = value == 1;
      }
    },
    addToFavorites: async function () {
      if (this.isInFavorite) {
        return;
      }

      let response = await apiClient.addToFavorites(this.topicObject.id);

      if (response) {
        this.isInFavorite = true;
        return;
      }
    },
    getReaction: async function () {
      let response = await apiClient.getUserTopicReaction(this.topicObject.id);
      if (typeof response == 'object') {
        this.reactedPositive = response.reactedPositive;
        this.reacted = response.reacted;
      }
    },
  },
  props: {
    topicObject: {
      Type: Object,
    },
    topicReaction: {
      Type: Object,
    },
  },
  watch: {
    topicObject(newValue) {
      this.topic = newValue;
    },
    topicReaction(newValue) {
      this.reaction = newValue;
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
  color:greenyellow !important;
  opacity: 0.9 !important;
}
.text-danger {
  color:indianred !important;
  opacity: 0.9 !important;
}
.reacted {
  background-color: white;
  border-radius: 5px;
}
.reaction {
  padding: 10%;
}
</style>