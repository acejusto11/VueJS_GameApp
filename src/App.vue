<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// import Main from './components/Main.vue';

export default {
  name: 'Main'
  // components: {
  //   'main-screen': Main
  // }
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
  background-image: url('./assets/forest.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
}
</style>
