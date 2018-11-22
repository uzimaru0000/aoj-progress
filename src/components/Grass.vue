<template>
  <div class="columns">
    <span class="name">{{name}}</span>
    <span class="name">{{ Math.floor(progress) }}%</span>
    <div  
      v-for="topic in topics"
      :key="topic.id"
      class="grass"
      :style="{
        background: calcGrassColor(topic.progress)
      }"
    >
    <span v-if="topic.progress === 100">!</span>
    </div>
  </div>
</template>

<script>
import * as utils from "../utils";

const endpoint = "http://localhost:5000";

export default {
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
    calcGrassColor(progress) {
      const hsv = utils.calcGrassColor(progress);
      const rgb = utils.hsvToRGB(hsv);
      return utils.rgbToString(rgb);
    }
  },
  created() {
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
  width: 640px;
}

.grass {
  flex: 1;
  height: 16px;
  margin: 1px 1.5px;
  color: white;
  text-align: center;
  box-sizing: border-box;
}

.name {
  width: 64px;
}
</style>
