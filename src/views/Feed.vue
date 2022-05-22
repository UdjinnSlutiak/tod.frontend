<template>
  <div style="margin: 1% 2% 2% 2%;">
    <div style="margin-bottom: 1%; display: flex;">
      <div @click="getLatestTopics()" :class="{'active-item': isLatestActive}" class="filter-item">
        <span class="material-icons">access_time_filled</span>
      </div>
      <div v-if="authObject" @click="getRecommended()" :class="{'active-item': isRecommendedActive}" class="filter-item">
        <span class="material-icons">tag</span>
      </div>
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
      isLatestActive: true,
      isRecommendedActive: false,
      isFavoriteActive: false,
      isDisscussedActive: false,
      isMyActive: false,
    }
  },
  methods: {
    getLatestTopics: async function () {
      this.setActiveFilter({ latest: true });
      let topics =  await apiClient.getLatestTopics(this.skip, this.offset);
      
      if (topics) {
        this.topics = topics.topics;
        return;
      }
      this.topics = [];
    },
    getRecommended: async function () {
      this.setActiveFilter({ recommended: true });
      let recommended = await apiClient.getRecommendedTopics();

      if (recommended) {
        this.topics = recommended.topics;
        return;
      }
      this.topics = [];
    },
    getFavorites: async function () {
      this.setActiveFilter({ favorites: true });
      let favorites = await apiClient.getFavorites();
      
      if (favorites) {
        this.topics = favorites.topics;
        return;
      }
      this.topics = [];
    },
    getDiscussed: async function () {
      this.setActiveFilter({ discussed: true });
      let discussed = await apiClient.getDiscussed();
      
      if (discussed) {
        this.topics = discussed.topics;
        return;
      }
      this.topics = [];
    },
    getMy: async function () {
      this.setActiveFilter({ my: true });
      let my = await apiClient.getMyTopics();

      if (my) {
        this.topics = my.topics;
        return;
      }
      this.topics = [];
    },
    setActiveFilter({ latest = false, recommended = false, discussed = false, favorites = false, my = false }) {
      this.isLatestActive = latest;
      this.isRecommendedActive = recommended;
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