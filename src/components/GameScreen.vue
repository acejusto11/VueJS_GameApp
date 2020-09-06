<template>
  <div>
    <health-mana-dashboard
      :playerName="characterName"
      :playerHealth="playerHealth"
      :enemyHealth="enemyHealth"
      :playerMana="playerMana"
      :enemyMana="enemyMana"
    />

    <div class="gameOver">{{ gameOver }}</div>
    <div v-if="!gameOver">
      <div class="player">
        <player-hero
          :skills="playerSkills"
          :currentMana="playerMana"
          :isEnemyDone="doneAttack"
          :characterClass="characterClass"
          @process-indicators="processIndicators"
        />
      </div>
      <div class="enemy">
        <enemy :message="enemyLog" :isAttacking="isEnemyAttacking" />
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import HealthManaDashboard from './HealthManaDashboard.vue';
import Player from './Player';
import Enemy from './Enemy';
import { getItemFromLocalStorage, getCharacterSkills } from '../utils';
export default {
  name: 'GameScreen',
  data() {
    return {
      characterName: '',
      characterClass: {},
      playerHealth: 100,
      enemyHealth: 100,
      playerMana: 100,
      enemyMana: 100,
      playerSkills: undefined,
      enemyLog: '',
      isEnemyAttacking: false,
      doneAttack: false,
      gameOver: ''
    };
  },
  mounted() {
    const userDetails = JSON.parse(getItemFromLocalStorage('currentUser'));
    const { characterName, characterClass } = userDetails;
    this.characterName = characterName;
    this.characterClass = characterClass;
    this.playerSkills = getCharacterSkills(characterClass.code);
  },
  components: {
    'health-mana-dashboard': HealthManaDashboard,
    'player-hero': Player,
    enemy: Enemy
  },
  methods: {
    processIndicators: function(data) {
      console.log('emitted', data);
      if (data.type === 'regenerateMana') {
        this.playerMana += data.mana;
      } else if (data.type === 'regenerateHealth') {
        this.playerHealth += data.health;
        this.playerMana -= data.mana;
      } else {
        this.enemyHealth -= data.damage;
        this.playerMana -= data.mana;
      }

      const enemySkill = this.selectEnemySkill();
      this.processAI(enemySkill);
    },
    selectEnemySkill: function() {
      const enemySkills = [
        { name: 'Basic Attack', damage: 10, mana: 0 },
        { name: 'Ice Breath', damage: 10, mana: 10 },
        { name: 'Swirling Wind', damage: 15, mana: 15 },
        { name: 'Molten Eruption', damage: 20, mana: 20 }
      ];
      const randomInt = Math.floor(Math.random() * Math.floor(3));
      const skill = enemySkills[randomInt];
      this.isEnemyAttacking = true;
      return skill;
    },
    processAI: function(enemySkill) {
      this.enemyLog = `Viserion is using ${enemySkill.name}`;
      if (this.enemyMana <= 20)
        enemySkill = { name: 'Regenerate Mana', damage: 0, mana: 20 };
      this.enemyLog = `Viserion is using ${enemySkill.name}`;
      setTimeout(() => {
        if (this.enemyMana <= 20) {
          this.enemyMana += enemySkill.mana;
        } else {
          this.playerHealth -= enemySkill.damage;
          this.enemyMana -= enemySkill.mana;
        }

        this.doneAttack = true;
        this.isEnemyAttacking = false;
        this.enemyLog = '';
      }, 3000);
    }
  },
  watch: {
    enemyHealth: function(health) {
      if (health <= 0) {
        this.gameOver = 'You win!';
      }
    },
    playerHealth: function(health) {
      if (health <= 0) {
        this.gameOver = 'You lose!';
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0px;
  background: rgba(0, 0, 0, 0.1);
  background-image: url('../assets/forest.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
}

.player {
  position: absolute;
  bottom: 150px;
  left: 150px;
}

.enemy {
  position: absolute;
  bottom: 150px;
  right: 150px;
}

.gameOver {
  color: white;
  font-size: 5rem;
  padding: 2rem;
}
</style>
