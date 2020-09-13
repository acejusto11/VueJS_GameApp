<template>
  <div class="container">
    <img class="blondeImg" src="../assets/blonde-7.png" />
    <div class="callOut">
      <img
        class="calloutImg"
        src="../assets/speech-balloon-callout-graphics-quote-box-png-clip-art.png"
      />
    </div>
    <div class="notification blinking">{{message}}</div>
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
}

.blondeImg {
  width: 200px;
}

.callOut {
  position: absolute;
  bottom: 0px;
  left: 95%;
}

.calloutImg {
  width: 600px;
  height: 200px !important;
}

.notification {
  font-family: Rubik;
  font-size: 1rem;
  font-weight: 700;
  color: black;
  position: absolute;
  bottom: 70%;
  left: 100%;
  width: 500px;
}
</style>