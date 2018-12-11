<template>
  <div
    class="grass"
    :style="{
      background: calcGrassColor(calcProgress())
    }"
    @mouseover="toggleMouseOver(true)"
    @mouseleave="toggleMouseOver(false)"
  ></div>
</template>

<script>
import * as utils from "../utils";

export default {
  props: {
    topic: Object
  },
  data() {
    return {
      flag: false
    };
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
