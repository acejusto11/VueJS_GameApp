<template>
  <div class="containerRow">
    <div class="half player text-center title" v-if="characterDetails.stats">
      <div class="name">{{ `${characterDetails.name} - Level ${characterDetails.level}` }}</div>
      <health-bar :max="characterDetails.stats.health.total" :value="currentPlayerHealth" />
      <mana-bar :max="characterDetails.stats.mana.total" :value="currentPlayerMana" />
      <span>
        HP : {{ currentPlayerHealth }} /
        {{ characterDetails.stats.health.total }}{{' '}}
      </span>&nbsp;
      <span>
        Mana : {{ currentPlayerMana }} /
        {{ characterDetails.stats.mana.total }}
      </span>
    </div>
    <div class="half enemy text-center title" v-if="enemyDetails">
      <div class="name">{{ `${enemyDetails.name} - Level ${enemyDetails.level}` }}</div>
      <health-bar :max="enemyDetails.stats.health" :value="currentEnemyHealth" isReverse />
      <mana-bar :max="enemyDetails.stats.mana" :value="currentEnemyMana" isReverse />
      <span>HP : {{ currentEnemyHealth }} / {{ enemyDetails.stats.health }}</span>&nbsp;
      <span>Mana : {{ currentEnemyMana }} / {{ enemyDetails.stats.mana }}</span>
    </div>
  </div>
</template>

<script>
import HealthBar from './HealthBar.vue';
import ManaBar from './ManaBar.vue';
export default {
  name: 'HealthManaDashboard',
  props: {
    characterDetails: Object,
    enemyDetails: Object,
    currentPlayerStats: Object,
    currentEnemyStats: Object
  },
  components: {
    'health-bar': HealthBar,
    'mana-bar': ManaBar
  },
  computed: {
    currentPlayerHealth() {
      return this.currentPlayerStats.health > 0
        ? this.currentPlayerStats.health
        : 0;
    },
    currentPlayerMana() {
      return this.currentPlayerStats.mana > 0
        ? this.currentPlayerStats.mana
        : 0;
    },
    currentEnemyHealth() {
      return this.currentEnemyStats.health > 0
        ? this.currentEnemyStats.health
        : 0;
    },
    currentEnemyMana() {
      return this.currentEnemyStats.mana > 0 ? this.currentEnemyStats.mana : 0;
    }
  },
  updated() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  color: black;
  text-shadow: 3px 3px 0 rgb(240, 234, 234), -1px -1px 0 rgb(240, 234, 234),
    1px -1px 0 rgb(240, 234, 234), -1px 1px 0 rgb(240, 234, 234),
    1px 1px 0 rgb(240, 234, 234);
}
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
  color: black;
  text-shadow: 3px 3px 0 rgb(240, 234, 234), -1px -1px 0 rgb(240, 234, 234),
    1px -1px 0 rgb(240, 234, 234), -1px 1px 0 rgb(240, 234, 234),
    1px 1px 0 rgb(240, 234, 234);
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
