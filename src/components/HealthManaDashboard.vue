<template>
  <div class="row">
    <div class="half">
      Ninja
      <health-bar :health="playerHealth" />
      <mana-bar :mana="playerMana" />
      <div class="iconContainer left">
        <img class="icon" src="../assets/ninja.png" />
      </div>
    </div>
    <div class="half">
      Dragon
      <health-bar :health="enemyHealth" :isEnemy="true" />
      <mana-bar :mana="enemyMana" />

      <div class="iconContainer right">
        <img class="icon" src="../assets/dragon.png" />
      </div>
    </div>
  </div>
</template>

<script>
import HealthBar from "./HealthBar.vue";
import ManaBar from "./ManaBar.vue";
export default {
  name: "HealthManaDashboard",
  props: {
    playerHealth: Number,
    playerMana: Number,
    enemyHealth: Number,
    enemyMana: Number
  },
  components: {
    "health-bar": HealthBar,
    "mana-bar": ManaBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
  justify-content: space-around;
  padding-top: 5rem;
}
.half {
  flex: 1 0 auto;
  width: 50px;
  padding: 0 100px;
}

.iconContainer {
  border-radius: 50%;
  border: 1px solid white;
  width: 100px;
  height: 100px;
  background: rgb(202, 198, 198);
}

.left {
  position: absolute;
  top: 70px;
  left: 50px;
}

.right {
  position: absolute;
  top: 70px;
  right: 50px;
}
.icon {
  width: 100px;
  height: 100px;
}
.dragonIcon {
  width: 150px;
  height: 150px;
}
</style>
