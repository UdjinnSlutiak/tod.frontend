<template>
  <div v-for="topic in topics" v-bind:key="topic.id" style="margin: 2%;">
    <topic-plate :topicObject="topic" style="margin-bottom: 1%;"></topic-plate>
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
    }
  },
  methods: {
    getLatestTopics: async function () {
      let topics =  await apiClient.getTopics(this.skip, this.offset);
      if (typeof topics == 'object') {
        this.topics = topics.topics;
      }
    },
  },
  watch: {
  }
}
</script>

<style>

</style>