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
  font-family: 'Galiver-Sans';
  src: local('Galiver-Sans'),
    url('./assets/fonts/galiver-sans/GALS.ttf') format('truetype');
}
body {
  margin: 0px;
  background: rgba(0, 0, 0, 0.1);
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
}
</style>
