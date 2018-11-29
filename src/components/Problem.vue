<template>
  <div
    class="grass"
    :style="{
          background: calcGrassColor(calcProgress())
        }"
    @mouseover="toggleMouseOver(true)"
    @mouseleave="toggleMouseOver(false)"
  >
    <hover v-show="flag" v-bind:name="problem.name" v-bind:url="url"></hover>
  </div>
</template>

<script>
import * as utils from "../utils";
import Hover from "./Hover";

export default {
  components: { Hover },
  props: {
    problem: Object,
    url: String
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
      return (100 * this.problem.userScore) / this.problem.maxScore;
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
