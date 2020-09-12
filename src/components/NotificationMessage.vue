<template>
  <div>{{message}}</div>
</template>

<script>
import { EventBus } from '../main';
export default {
  name: 'NotificationMessage',
  data() {
    return {
      message: ''
    };
  },
  created() {
    EventBus.$on('notify', message => {
      this.message = message;
      setTimeout(() => (this.message = ''), 2000);
    });
  },
  destroyed() {
    EventBus.$off('player-attacks');
  }
};
</script>

<style scoped>
</style>