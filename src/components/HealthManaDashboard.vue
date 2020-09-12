<template>
  <div class="containerRow">
    <div class="half player">
      <div class="name">{{ `${playerHealth} (Level ${playerLevel})` }}</div>
      <health-bar :health="playerHealth" />
      <mana-bar :mana="playerMana" />
      <div class="iconContainer left">
        <img class="icon" src="../assets/ninja.png" />
      </div>
    </div>
    <div class="half enemy">
      <div class="name">{{ enemyHealth }}</div>
      <health-bar :health="enemyHealth" :isReverse="true" />
      <mana-bar :mana="enemyMana" :isReverse="true" />

      <div class="iconContainer right">
        <img class="icon" src="../assets/dragon2.png" />
      </div>
    </div>
  </div>
</template>

<script>
import HealthBar from './HealthBar.vue';
import ManaBar from './ManaBar.vue';
export default {
  name: 'HealthManaDashboard',
  props: {
    playerName: String,
    playerLevel: Number,
    playerHealth: Number,
    playerMana: Number,
    enemyHealth: Number,
    enemyMana: Number
  },
  components: {
    'health-bar': HealthBar,
    'mana-bar': ManaBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.containerRow {
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
}
.half {
  flex: 1 0 auto;
  width: 50px;
  padding: 0 100px;
  font-size: 2rem;
  font-weight: 600;
  color: white;
}

.player {
  padding: 0 100px 0 140px;
}

.enemy {
  padding: 0 140px 0 100px;
}

.name {
  min-height: 48px;
}

.iconContainer {
  border-radius: 50%;
  border: 1px solid #2a2b18;
  width: 100px;
  height: 100px;
  background: rgb(202, 198, 198);
}

.left {
  position: absolute;
  top: 20px;
  left: 50px;
}

.right {
  position: absolute;
  top: 20px;
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
