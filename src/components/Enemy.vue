<template>
  <div>
    <div class="blinking message">{{message}}</div>
    <div v-if="isAttacking" class="attackingDragon">
      <img class="attacking" src="../assets/dragonAttack.gif" />
    </div>
    <div v-else class="idleDragon">
      <img class="idle" src="../assets/dragonAttack-1.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Enemy",
  props: {
    message: String,
    isAttacking: Boolean
  },
  methods: {},
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  -->
<style scoped>
div {
  color: white;
}

.attackingDragon {
  position: absolute;
  bottom: 100px;
  right: 80px;
  width: 500px;
  height: 500px;
}

.idleDragon {
  position: absolute;
  bottom: 40px;
  right: 80px;
  width: 400px;
  height: 400px;
}

.idle {
  width: 400px;
  height: 400px;
}

.attacking {
  width: 600px;
  height: 600px;
}

.message {
  margin-right: 90px;
  color: white;
  font-size: 1.5rem;
}
</style>
