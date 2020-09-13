<template>
  <div class="containerRow">
    <div class="half player">
      <div class="name">{{ `${characterData.name} - Level ${characterData.level}` }}</div>
      <health-bar :health="characterData.health" />
      <mana-bar :mana="characterData.mana" />
      <div class="iconContainer left">
        <img class="icon" src="../assets/ninja.png" />
      </div>
      <span>HP : {{ characterData.health }} / {{characterStats.health}}</span>&nbsp;
      <span>Mana : {{ characterData.mana }} / {{characterStats.mana}}</span>
    </div>
    <div class="half enemy">
      <div class="name">Viserion</div>
      <health-bar :health="enemyData.health" :isReverse="true" />
      <mana-bar :mana="enemyData.mana" :isReverse="true" />

      <div class="iconContainer right">
        <img class="icon" src="../assets/dragon2.png" />
      </div>
      <span>HP : {{ enemyData.health }} / {{monsterStats.health}}</span>&nbsp;
      <span>Mana : {{ enemyData.mana }} / {{monsterStats.mana}}</span>
    </div>
  </div>
</template>

<script>
import HealthBar from './HealthBar.vue';
import ManaBar from './ManaBar.vue';
export default {
  name: 'HealthManaDashboard',
  props: {
    characterStats: Object,
    characterData: Object,
    monsterStats: Object,
    enemyData: Object
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
  border-radius: 8px;
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
span {
  font-family: Rubik, Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
