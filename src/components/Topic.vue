<template>
  <div
    class="grass"
    :style="{
      background: calcGrassColor(calcProgress())
    }"
    @mouseover="toggleMouseOver(true)"
    @mouseleave="toggleMouseOver(false)"
  >
    <hover v-if="flag" :name="topic.shortName" :url="url"></hover>
  </div>
</template>

<script>
import * as utils from "../utils";
import Hover from "./Hover";

export default {
  components: {
    Hover
  },
  props: {
    topic: Object,
    shortName: String,
    id: Number
  },
  data() {
    return {
      flag: false
    };
  },
  computed: {
    url() {
      return utils.genURL(this.id, this.shortName, this.id);
    }
  },
  methods: {
    calcGrassColor(progress) {
      const hsv = utils.calcGrassColor(progress);
      const rgb = utils.hsvToRGB(hsv);
      return utils.rgbToString(rgb);
    },
    calcProgress() {
      return (100 * this.topic.userScore) / this.topic.maxScore;
    },
    toggleMouseOver(flag) {
      this.flag = flag;
    }
  }
};
</script>

<style scoped>
.grass {
  position: relative;
  flex: 1;
  height: 16px;
  margin: 1px 1.5px;
  color: white;
  text-align: center;
  box-sizing: border-box;
}
</style>
