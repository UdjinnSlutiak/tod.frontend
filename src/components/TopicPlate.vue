<template>
  <div class="topic-plate">
    <div class="topic-title" @click="this.openTopic(topicObject.id)">
      {{title}}
    </div>
    <div class="topic-tags">
      <div class="topic-tag" v-for="tag in tags" v-bind:key="tag.usedCount">
        {{tag.text}}
      </div>
    </div>
    <div class="topic-info">
      <div style="display: flex;">
        <div @click="react(topicObject.id, 1)" v-if="!userContent && authObject" class="text-success">
          <span class="material-icons reaction" :class="{'reacted': reactedPositive && reacted}">thumb_up</span>
        </div>
        <div :class="{'text-success': rating > 0, 'text-danger': rating < 0}" style="display: flex; margin: auto 10%;">
          <span v-if="userContent || !authObject" class="material-icons">thumbs_up_down</span>
          <label style="margin: auto 5%;">{{rating}}</label>
        </div>
        <div @click="react(topicObject.id, -1)" v-if="!userContent && authObject" class="text-danger">
            <span class="material-icons reaction" :class="{'reacted': !reactedPositive && reacted}">thumb_down</span>
        </div>
        <div @click="addToFavorites()" v-if="!userContent && authObject && !isInFavorite" style="margin: 0 15%; cursor: pointer;">
            <span class="material-icons">bookmark_add</span>
        </div>
        <div v-if="!userContent && authObject && isInFavorite" class="text-success" style="margin: 0 15%;">
            <span class="material-icons">bookmark_added</span>
        </div>
        <div @click="showEditForm = true;" v-if="userContent && authObject" class="action">
          <span class="material-icons">edit</span>
        </div>
        <div @click="showDeleteDialog = true;" v-if="userContent && authObject" class="action-danger">
          <span class="material-icons">delete</span>
        </div>
      </div>
      <div v-if="!userContent" style="text-align:right; margin: auto 0;">
        {{topicObject.author.username}} at {{getDateTime(topicObject.createdUtc)}}
      </div>
      <div v-else style="text-align:right; margin: auto 0;">
        me at {{getDateTime(topicObject.createdUtc)}}
      </div>
    </div>
  </div>
  <delete-dialog @onDeleteDialogConfirmed="deleteTopic" v-if="showDeleteDialog" :contentType="'topic'"></delete-dialog>
  <topic-form v-if="showEditForm" @onTopicFormConfirmed="editConfirmed" :isCreating="false" :topicId="topicObject.id" :topicTitle="topicObject.title" :topicTags="tagsText"></topic-form>
</template>

<script>
import apiClient from "../services/apiClient";
import DeleteDialog from "./modals/dialogs/DeleteDialog.vue";
import TopicForm from "./forms/TopicForm.vue";

export default {
  name: "topic-plate",
  components: {
    DeleteDialog,
    TopicForm,
  },
  mounted: async function () {
    this.userContent = this.currentUserContent(this.topicObject.author.username);
    if (this.userContent) {
      this.getTagsText();
    }

    this.title = this.topicObject.title;
    this.tags = this.topicObject.tags;
    this.rating = this.topicObject.rating;
    this.isInFavorite = this.topicObject.isInFavorite;

    if (this.authObject && !this.userContent) {
      await this.getReaction();
    }

  },
  data() {
    return {
      title: "",
      userContent: false,
      rating: 0,
      isInFavorite: false,
      reactedPositive: false,
      reaction: {},
      reacted: false,
      showDeleteDialog: false,
      showEditForm: false,
      tagsText: [],
      tags: [],
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
        this.reaction = response;
        return;
      }
      this.rating += value;
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
        this.reaction = response;
        this.reactedPositive = response.reactedPositive;
        this.reacted = response.reacted;
      }
    },
    editConfirmed: function (result) {
      this.showEditForm = false;
      if (result) {
        this.title = result.title;
        this.tags = result.tags;
      }
    },
    deleteTopic: async function (result) {
      this.showDeleteDialog = false;
      if (!result) {
        return;
      }

      let response = await apiClient.deleteTopic(this.topicObject.id);
      if (response) {
        this.$router.push("/feed");
      }
    },
    getTagsText: function () {
      this.topicObject.tags.forEach(element => this.tagsText.push(element.text));
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
}
.topic-title {
  border-radius: 10px 10px 0 0;
  color: #F2ECFF;
  text-align: justify;
  padding: 1%;
  font-size:large;
  cursor: pointer;
  background-color: #3E4044;
}
.topic-tags {
  display: flex;
  margin: 0.5% 1% 0 1%;
}
.topic-tag {
  display: flex;
  border-radius: 6px;
  background-color: #00C896;
  color:#F2ECFF;
  padding: 0.3%;
  margin: 0.3%;
  font-size:smaller;
  cursor: pointer;
}
.topic-info {
  display: flex;
  color:#F2ECFF;
  text-align: right;
  font-style: italic;
  padding: 0 0.5% 1% 0;
  font-size:smaller;
  justify-content: space-between;
  margin: 1% 1%;
}
.text-success {
  color:#00C896 !important;
}
.text-danger {
  color:#985D6C !important;
}
.reacted {
  background-color:#F2ECFF;
  border-radius: 5px;
}
.reaction {
  padding: 10%;
  cursor: pointer;
}
.action {
  padding: 6%;
  margin: 0 10%;
  background-color:#FBB666 !important;
  border-radius: 5px;
  cursor: pointer;
}
.action-danger {
  padding: 6%;
  margin: 0 10%;
  background-color:#985D6C !important;

  border-radius: 5px;
  cursor: pointer;
}
</style>