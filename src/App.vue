<template>
  <div>
    <main-screen />
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "Main",
  components: {
    "main-screen": Main,
  },
};
</script>

<style>
@font-face {
  font-family: "NinjaGarden";
  src: local("NinjaGarden"),
    url("./fonts/ninja-garden/NinjaGarden-1gAL.otf") format("truetype");
}
body {
  margin: 0px;
}
</style>
