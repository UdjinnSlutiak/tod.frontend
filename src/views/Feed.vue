<template>
  <div style="margin: 1% 2% 2% 2%;">
    <div style="margin-bottom: 1%; display: flex;">
      <div v-if="authObject" @click="getFavorites()" :class="isFavoriteActive ? 'item-active' : 'item-inactive'" class="filter-item">
        <span class="material-icons">bookmarks</span>
      </div>
      <div v-if="authObject" @click="getDiscussed()" :class="isDiscussedActive ? 'item-active' : 'item-inactive'" class="filter-item">
        <span class="material-icons">question_answer</span>
      </div>
      <div v-if="authObject" @click="getMy()" :class="isMyActive ? 'item-active' : 'item-inactive'" class="filter-item">
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
      filters: [
        { name: "favorites", active: false, },
        { name: "discussed", active: false, },
        { name: "my", active: false, },
      ],
      isFavoriteActive: this.filters.find(_ => _.name == 'favorite').active,
      isDiscussedActive: this.filters.find(_ => _.name == 'discussed').active,
      isMyActive: this.filters.find(_ => _.name == 'my').active,
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
      this.setActiveFilter("favorites");
    },
    getDiscussed: async function () {
      this.setActiveFilter("discussed");
    },
    getMy: async function () {
      this.setActiveFilter("my");
    },
    setActiveFilter(name) {
      this.filters.forEach(filter => filter.active = false);
      this.filters.find(filter => filter.name == name).active = true;
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
.item-inactive {
  color: #F2ECFF;
}
</style>