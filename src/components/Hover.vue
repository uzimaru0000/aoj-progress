<template>
  <div>
    <a :href="url" target="_brink">{{name}}</a>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    url: String
  }
};
</script>


<style scoped>
div {
  position: absolute;
  top: 26px;
  left: -10px;
  height: 16px;
  padding: 8px;
  background: gray;
  z-index: 100;
  white-space: nowrap;
  border-radius: 10px;
}
div::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 10px;
  border: 10px solid transparent;
  border-bottom: 10px solid gray;
}

div a {
  color: white;
  text-decoration: none;
}
</style>
