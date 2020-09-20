<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Main'
};
</script>

<style>
@font-face {
  font-family: 'NinjaGarden';
  src: local('NinjaGarden'),
    url('./fonts/ninja-garden/NinjaGarden-1gAL.otf') format('truetype');
}
body {
  margin: 0px;
  background: rgba(0, 0, 0, 0.1);
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
}
</style>
