<template>
  <div class="commentary" v-bind:class="this.getCommentaryClass(commentaryObject.author.username)">
    <div>
      {{text}}
    </div>
    <div class="commentary-info">
      <div style="display: flex;">
        <div @click="react(commentaryObject.id, 1)" v-if="!userContent && authObject" class="text-success" style="cursor: pointer;">
          <span class="material-icons reaction" :class="{'reacted': reactedPositive && reacted}">thumb_up</span>
        </div>
        <div v-bind:class="{'text-success': rating > 0, 'text-danger': rating < 0}" style="margin: auto 8%; display: flex;">
          <span v-if="userContent || !authObject" style="margin-right: 8%;" class="material-icons">thumbs_up_down</span>
          <label style="margin: auto 5%;">{{rating}}</label>
        </div>
        <div @click="react(commentaryObject.id, -1)" v-if="!userContent && authObject" class="text-danger" style="cursor: pointer;">
          <span class="material-icons reaction" :class="{'reacted': !reactedPositive && reacted}">thumb_down</span>
        </div>
        <div @click="showCommentaryForm = true;" v-if="userContent && authObject" class="action">
          <span class="material-icons">edit</span>
        </div>
        <div @click="showDeleteDialog = true;" v-if="userContent && authObject" class="action-danger">
          <span class="material-icons">delete</span>
        </div>
      </div>
      <div v-if="!userContent" style="margin: auto 0;">
        {{commentaryObject.author.username}} at {{getDateTime(commentaryObject.createdUtc)}}
      </div>
      <div v-else style="margin: auto 0;">
        me at {{getDateTime(commentaryObject.createdUtc)}}
      </div>
    </div>
  </div>
  <delete-dialog v-if="showDeleteDialog" @onDeleteDialogConfirmed="deleteCommentary" :contentType="'commentary'"></delete-dialog>
  <commentary-form v-if="showCommentaryForm" @onEditConfirmed="updateCommentary" :commentaryText="text"></commentary-form>
</template>

<script>
import apiClient from "../services/apiClient";
import DeleteDialog from "./modals/dialogs/DeleteDialog.vue";
import CommentaryForm from "./forms/CommentaryForm.vue";

export default {
  name: "commentary",
  components: {
    DeleteDialog,
    CommentaryForm,
  },
  mounted: async function () {
    this.userContent = this.currentUserContent(this.commentaryObject.author.username);
    this.rating = this.commentaryObject.rating;
    this.text = this.commentaryObject.text;
  },
  data() {
    return {
      userContent: false,
      text: "",
      rating: 0,
      reaction: {},
      reacted: false,
      reactedPositive: false,
      showDeleteDialog: false,
      showCommentaryForm: false,
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
      let response;
      try {
        response = await apiClient.reactOnCommentary(id, value);
      } catch (error) {
        return;
      }

      if (response != "OK") {
        this.reaction = response;
        return;
      }
      this.rating += value;

      this.rating += this.reaction.reacted ? value : 0;
      this.reacted = true;
      this.reactedPositive = value == 1;
    },
    updateCommentary: async function (result) {
      this.showCommentaryForm = false;
      if (!result) {
        return;
      }
      if (result == this.text) {
        return;
      }

      let response = await apiClient.updateCommentary(this.commentaryObject.id, result);
      if (response) {
        this.text = result;
      }
    },
    deleteCommentary: async function (result) {
      this.showDeleteDialog = false;
      if (!result) {
        return;
      }

      let response = apiClient.deleteCommentary(this.commentaryObject.id);
      if (response) {
        this.$router.push("/feed");
      }
    },
  },
  props: {
    commentaryObject: {
      Type: Object,
    },
    userCommentaryReaction: {
      Type: Object,
    },
  },
  watch: {
    userCommentaryReaction(newValue) {
      if (newValue) {
        this.reaction = newValue;
        this.reacted = newValue.reacted;
        this.reactedPositive = newValue.reactedPositive;
      }
    }
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
  font-size:smaller;
  justify-content: space-between;
  margin-top: 0.5%;
}
</style>