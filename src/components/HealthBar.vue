<template>
  <div
    class="healthBar"
    :class="{reverse:isEnemy}"
    style="background-color: #d5d539;"
    :style="playerHealthBar"
  ></div>
</template>

<script>
export default {
  name: "HealthBar",
  props: {
    health: Number,
    isEnemy: Boolean
  },
  computed: {
    playerHealthBar: function() {
      var styles = {
        width: this.health + "%"
      };
      if (this.health <= 20) {
        styles.backgroundColor = "red";
      } else {
        styles.backgroundColor = "#d5d539";
      }
      return styles;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.healthBar {
  height: 15px;
  max-width: 100%;
  transition: width 300ms;
  border-radius: 20px;
}
.reverse {
  display: flex;
  flex-direction: row-reverse;
}
</style>
