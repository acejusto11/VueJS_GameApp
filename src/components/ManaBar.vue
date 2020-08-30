<template>
  <div class="manaBar" style="background-color: #3535d1; color: white;" :style="manaBar"></div>
</template>

<script>
export default {
  name: "ManaBar",
  props: {
    mana: Number
  },
  computed: {
    manaBar: function() {
      const mana = this.mana < 0 ? 0 : this.mana;

      const styles = {
        width: mana + "%"
      };
      if (this.mana <= 30) {
        styles.backgroundColor = "rgb(80 80 238)";
      } else {
        styles.backgroundColor = "#3535d1";
      }
      return styles;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manaBar {
  margin-top: 0.25rem;
  height: 10px;
  background-color: rgb(230, 214, 214);
  max-width: 100%;
  transition: width 300ms;
  border-radius: 20px;
}
</style>
