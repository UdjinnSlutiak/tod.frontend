<template>
  <div style="margin: 1% 2% 2% 2%;">
    <div style="margin-bottom: 1%; display: flex;">
      <div v-if="authObject" @click="getFavorites()" :class="{'active-item': isFavoriteActive}" class="filter-item">
        <span class="material-icons">bookmarks</span>
      </div>
      <div v-if="authObject" @click="getDiscussed()" :class="{'active-item': isDisscussedActive}" class="filter-item">
        <span class="material-icons">question_answer</span>
      </div>
      <div v-if="authObject" @click="getMy()" :class="{'active-item': isMyActive}" class="filter-item">
        <span class="material-icons">article</span>
      </div>
    </div>
    <div v-for="topic in topics" v-bind:key="topic.id">
      <topic-plate :topicObject="topic" style="margin-bottom: 1%;"></topic-plate>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/apiClient";
import TopicPlate from "../components/TopicPlate.vue";

export default {
  components: {
    TopicPlate,
  },
  created: async function () {
    await this.getLatestTopics();
  },
  data() {
    return {
      topics: [],
      skip: 0,
      offset: 20,
      isFavoriteActive: false,
      isDisscussedActive: false,
      isMyActive: false,
    }
  },
  methods: {
    getLatestTopics: async function () {
      let topics =  await apiClient.getTopics(this.skip, this.offset);
      if (typeof topics == 'object') {
          this.topics = topics.topics;
      }
    },
    getFavorites: async function () {
      this.setActiveFilter({ favorites: true });
      let favorites = await apiClient.getFavorites();
      
      if (favorites) {
        this.topics = favorites.topics;
      }
    },
    getDiscussed: async function () {
      this.setActiveFilter({ discussed: true });
    },
    getMy: async function () {
      this.setActiveFilter({ my: true });
      let my = await apiClient.getMyTopics();

      if (my) {
        this.topics = my.topics;
      }
    },
    setActiveFilter({discussed = false, favorites = false, my = false}) {
      this.isFavoriteActive = favorites;
      this.isDisscussedActive = discussed;
      this.isMyActive = my;
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
.filter-item {
  margin: 0 1% 0 0;
  text-decoration: none;
  color: #F2ECFF;
  cursor: pointer;
}
.filter-item:hover {
  color: #00C896;
}
.inactive-item {
  color: #F2ECFF;
}
</style>