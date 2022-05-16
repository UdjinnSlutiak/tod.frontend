<template>
  <div class="commentary" v-bind:class="this.getCommentaryClass(commentaryObject.author.username)">
    <div>
      {{commentaryObject.text}}
    </div>
    <div class="commentary-info">
      <div style="display: flex; z-index: 10;">
        <div @click="react(commentaryObject.id, 1)" v-if="!userContent && authObject" class="text-success" style="cursor: pointer;">
          <span class="material-icons">thumb_up</span>
        </div>
        <div v-bind:class="getRatingClass(commentaryObject.rating)" style="margin: 0 8%; display: flex;">
          <span v-if="userContent || !authObject" style="margin-right: 8%;" class="material-icons">thumbs_up_down</span>
          {{commentaryObject.rating}}
        </div>
        <div @click="react(commentaryObject.id, -1)" v-if="!userContent && authObject" class="text-danger" style="cursor: pointer;">
          <span class="material-icons">thumb_down</span>
        </div>
      </div>
      <div v-if="!userContent">
        {{commentaryObject.author.username}} at {{getDateTime(commentaryObject.createdUtc)}}
      </div>
      <div v-else>
        me at {{getDateTime(commentaryObject.createdUtc)}}
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/apiClient";


export default {
  name: "commentary",
  mounted: async function () {
    this.userContent = this.currentUserContent(this.commentaryObject.author.username);
  },
  data() {
    return {
      userContent: false,
    }
  },
  methods: {
    getCommentaryClass(username) {
      if (!this.authObject) {
        return 'another-commentary';
      }
      if (this.authObject.user.username == username) {
        return 'your-commentary';
      }
      return 'another-commentary';
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
    react: async function (id, value) {
      let response = await apiClient.reactOnCommentary(id, value);
      return response == "OK" ? value : 0;
    },
  },
  props: {
    commentaryObject: {
      Type: Object,
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
.commentary {
  border-radius: 10px;
  color: #F2ECFF;
  max-width: 70%;
  min-width: min-content;
  padding: 1.5% 1.5% 1% 1.5%;
  z-index: 1;
}
.your-commentary {
  text-align: right;
  margin-right: 0;
  margin-left: auto;
  background-color: #00C896;
}
.another-commentary {
  text-align: left;
  margin-right: auto;
  margin-left: 0;
  background-color: #518071;
}
.commentary-info {
  display: flex;
  font-style: italic;
  opacity: 0.8;
  font-size:smaller;
  justify-content: space-between;
  margin-top: 0.5%;
}
.text-success {
  color:greenyellow;
  opacity: 0.9 !important;
}
.text-danger {
  color:indianred;
  opacity: 1 !important;
}
</style>