<template>
  <div
    class="healthBar"
    :class="{reverse:isEnemy}"
    style="background-color: yellow; color: white;"
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
      if (this.health <= 20) styles.backgroundColor = "red";
      return styles;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.healthBar {
  height: 20px;
  background-color: rgb(230, 214, 214);
  max-width: 100%;
  transition: width 300ms;
}
.reverse {
  display: flex;
  flex-direction: row-reverse;
}
</style>
