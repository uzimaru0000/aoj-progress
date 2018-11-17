<template>
  <div>
    <grass></grass>
  <!-- <grass
    v-for="(course, index) in courses"
    :key="index"
    v-bind:courseData="course"
    >
  </grass> -->
  </div>  
</template>

<script>
import Grass from "./Grass.vue";

const endpoint = "https://judgeapi.u-aizu.ac.jp";

export default {
  data() {
    return {
      courses: []
    };
  },
  components: { Grass },
  created() {
    const loginData = {
      id: "s1250087",
      password: "2741"
    };

    // fetch(`${endpoint}/session`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   mode: "cors",
    //   body: JSON.stringify(loginData)
    // })
    //   .then(res => {
    //     if (res.ok) {
    //       return fetch(`${endpoint}/courses?lang=ja`);
    //     } else {
    //       throw "login failed";
    //     }
    //   })
    //   .then(res => res.json())
    //   .then(data => (this.courses = data.courses))
    //   .catch(err => console.error(err));
  }
};
</script>

<style scoped>
</style>
