<template>
  <div>
    <div v-if="isAttacking" v-class="attackingDragon">
      <img src="../assets/dragonAttack.gif" />
    </div>
    <div v-else v-class="attackingDragon">
      <img src="../assets/dragonAttack-0.png" />
    </div>
    <div class="blinking">{{message}}</div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  color: white;
}

.attackingDragon {
  position: absolute;
  bottom: 150px;
  right: 10px;
}

img {
  width: 500px;
  height: 500px;
}
</style>
