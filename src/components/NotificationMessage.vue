<template>
  <div class="container">
    <img class="blondeImg" src="../assets/blonde_2.png" />
    <div class="callOut">
      <img class="calloutImg" src="../assets/callout.png" />
      <div class="notification left-text blinking">{{message}}</div>
    </div>
  </div>
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
.container {
  padding: 0px;
  position: absolute;
  bottom: 0px;
  width: 200px;
}

.blondeImg {
  width: 200px;
  bottom: 0px;
}

.callOut {
  position: absolute;
  bottom: 0px;
  left: 100%;
}

.calloutImg {
  width: 600px;
  height: 200px !important;
}

.notification {
  font-family: Rubik;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  position: absolute;
  bottom: 20%;
  left: 30%;
  width: 400px;
  height: 150px;
}
</style>