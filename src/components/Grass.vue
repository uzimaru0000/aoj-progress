<template>
  <div class="columns">
    <span class="name">{{name}}</span>
    <span class="name">{{ Math.floor(progress) }}%</span>
    <div v-for="topic in topics" :key="topic.id" class="topic">
      <problem
        v-for="problem in topic.problems"
        :key="problem.id"
        v-bind:problem="problem"
        v-bind:url="genProblemURL(topic, problem)"
      ></problem>
    </div>
  </div>
</template>

<script>
import * as utils from "../utils";
import Problem from "./Problem";

const endpoint = "http://localhost:5000";

export default {
  components: { Problem },
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
    fetch(`${endpoint}/courses/${this.courseData.id}`, {
      mode: "cors",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        this.name = data.course.shortName;
        this.topics = data.course.topics;
        this.progress = data.course.progress;
      })
      .catch(err => console.error(err));
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
