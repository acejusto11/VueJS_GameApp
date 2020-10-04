<template>
  <div>
    <div v-if="isAttacking" class="enemy-container">
      <img class="attacking" :src="getImage()" />
    </div>
    <div v-else class="enemy-container">
      <img class="idle" :src="getImage()" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Enemy',
  props: {
    enemyDetails: Object,
    isAttacking: Boolean
  },
  methods: {
    getImage() {
      return this.enemyDetails
        ? require(`../assets/enemies/${this.enemyDetails.image}.png`)
        : '';
    }
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  -->
<style scoped>
div {
  color: white;
}

.enemy-container {
  position: absolute;
  bottom: 100px;
  right: 80px;
}

.idle {
  width: 300px;
  height: 300px;
}

.attacking {
  width: 350px;
  height: 350px;
}

.message {
  margin-right: 90px;
  color: white;
  font-size: 1.5rem;
}
</style>
