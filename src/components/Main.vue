<template>
  <div id="app">
    <div v-if="isAccountCreated">
      <game-screen />
    </div>
    <div v-else>
      <account-creation-form @account-created="setAccountCreatedFlag" />
    </div>
  </div>
</template>

<script>
import GameScreen from '../components/GameScreen.vue';
import AccountCreationForm from '../components/AccountCreationForm.vue';
import { getItem } from '../utils/localStorage';

export default {
  name: 'App',
  data() {
    return {
      showForm: true,
      isAccountCreated: false
    };
  },
  components: {
    'game-screen': GameScreen,
    'account-creation-form': AccountCreationForm
  },
  methods: {
    setAccountCreatedFlag(isAccountCreated) {
      this.isAccountCreated = isAccountCreated;
    }
  },
  computed: {
    hasCurrentUser() {
      return getItem('currentUser');
    }
  }
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
