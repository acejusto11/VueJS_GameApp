<template>
  <div id="app">
    <div v-if="isAuthenticated">
      <game-screen :accountId="accountId" />
    </div>
    <div v-else>
      <login-form @set-authentication="setAccount" />
    </div>
  </div>
</template>

<script>
import GameScreen from '../components/GameScreen.vue';
import LoginForm from '../components/Forms/LoginForm';

export default {
  name: 'App',
  data() {
    return {
      accountId: undefined,
      isAuthenticated: false
    };
  },
  components: {
    'login-form': LoginForm,
    'game-screen': GameScreen
  },
  methods: {
    setAccount(id) {
      this.accountId = id;
      this.isAuthenticated = true;
    }
  },
  computed: {}
};
</script>

<style>
@font-face {
  font-family: 'NinjaGarden';
  src: local('NinjaGarden'),
    url('../fonts/ninja-garden/NinjaGarden-1gAL.otf') format('truetype');
}

#app {
  font-family: NinjaGarden, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
