<template>
  <div :class="{ reverse: isReverse }">
    <div class="manaBar barColor" :class="{reverseBarColor: isReverse  }" :style="manaBar"></div>
  </div>
</template>

<script>
export default {
  name: 'ManaBar',
  props: {
    value: Number,
    max: Number,
    isReverse: Boolean
  },
  computed: {
    manaBar: function() {
      const percentage = (this.value / this.max) * 100;
      const styles = {
        width: percentage + '%'
      };
      if (this.value <= 30) {
        styles.background =
          'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(3,189,230,1) 2%, rgba(2,193,235,1) 80%, rgba(25,2,31,1) 99%)';
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

.barColor {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 212, 255, 1) 0%,
    rgba(3, 189, 230, 1) 2%,
    rgba(2, 193, 235, 1) 8%,
    rgba(25, 2, 31, 1) 34%
  );
}

.reverseBarColor {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(25, 2, 31, 1) 64%,
    rgba(2, 193, 235, 1) 96%,
    rgba(0, 212, 255, 1) 100%,
    rgba(3, 189, 230, 1) 100%
  );
}

.reverse {
  display: flex;
  flex-direction: row-reverse;
}
</style>
