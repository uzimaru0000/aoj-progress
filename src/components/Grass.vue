<template>
  <div class="columns">
    <span class="name">{{name}}</span>
    <span class="name">{{ Math.floor(progress) }}%</span>
    <topic v-for="topic in topics" :key="topic.id" v-bind:topic="topic"></topic>
  </div>
</template>

<script>
import * as utils from "../utils";
import Problem from "./Problem";
import Topic from "./Topic";

const endpoint = "http://localhost:5000";

export default {
  components: { Topic },
  props: {
    courseData: Object
  },
  data() {
    return {
      name: "",
      topics: [],
      progress: 0
    };
  },
  methods: {
    genProblemURL(topic, problem) {
      return utils.genURL(this.courseData.id, this.name, topic.id, problem.id);
    }
  },
  created() {
    console.log(this.courseData);
    this.name = this.courseData.shortName;
    this.topics = this.courseData.topics;
    this.progress = this.courseData.progress;
  }
};
</script>

<style scoped>
.columns {
  display: flex;
  flex-direction: row;
  width: 980px;
}

.topic {
  display: flex;
  flex-direction: row;
  flex: 1;
  border: 1px solid gray;
}

.name {
  width: 64px;
}
</style>
