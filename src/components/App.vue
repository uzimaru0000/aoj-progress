<template>
  <div>
    <div>
      <span>ID : </span><input type="text" v-model="loginData.id">
      <span>Password : </span><input type="password" v-model="loginData.password">
      <button @click="getCourses">Login</button>
    </div>
    <div>
      <grass
        v-for="(course, index) in courses"
        :key="index"
        v-bind:courseData="course"
        >
      </grass>
    </div>
  </div>  
</template>

<script>
import Grass from "./Grass.vue";

const endpoint = "http://localhost:5000";

export default {
  data() {
    return {
      courses: [],
      loginData: {
        id: "",
        password: ""
      }
    };
  },
  components: { Grass },
  methods: {
    getCourses() {
      fetch(`${endpoint}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(this.loginData)
      })
        .then(res => {
          if (res.ok) {
            return fetch(`${endpoint}/courses`, {
              mode: "cors",
              credentials: "include"
            });
          } else {
            throw "error";
          }
        })
        .then(res => res.json())
        .then(data => (this.courses = data.courses))
        .catch(err => console.error(err));
    }
  }
};
</script>

<style scoped>
</style>
