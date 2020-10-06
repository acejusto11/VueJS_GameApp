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

img {
  max-width: 300px;
  max-height: 300px;
  min-width: 150px;
  min-height: 150px;
}
</style>
