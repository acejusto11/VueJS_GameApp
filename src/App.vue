<template>
  <div id="app">
    <MainScreen msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import MainScreen from "./components/MainScreen.vue";

export default {
  name: "App",
  components: {
    MainScreen
  }
};
</script>

<style>
body {
  margin: 0px;
  background: rgba(0, 0, 0, 0.1);
  background-image: url("./assets/forest.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
