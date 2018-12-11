<template>
  <div>
    <div>
      <span>ID :</span>
      <input type="text" v-model="id">
      <button @click="getCourses">Login</button>
    </div>
    <div>
      <grass v-for="(course, index) in courses" :key="index" v-bind:courseData="course"></grass>
    </div>
  </div>
</template>

<script>
import Grass from "./Grass.vue";

const endpoint = "https://judgeapi.u-aizu.ac.jp";

export default {
  data() {
    return {
      courses: [],
      id: ""
    };
  },
  components: { Grass },
  methods: {
    getCourses() {
      if (this.id === "") return;
      fetch(`${endpoint}/courses/summary/users/${this.id}`)
        .then(res => res.json())
        .then(data => (this.courses = data.courses))
        .catch(err => console.error(err));
    }
  }
};
</script>

<style scoped>
</style>
