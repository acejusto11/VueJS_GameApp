<template>
  <div class="dungeon">
    <health-mana-dashboard
      :playerName="characterData.name"
      :playerLevel="characterData.level"
      :playerHealth="characterData.health"
      :playerMana="characterData.mana"
      :enemyHealth="enemyHealth"
      :enemyMana="enemyMana"
    />
    <div class="gameOver">{{ gameOver }}</div>
    <div v-if="!gameOver">
      <div class="player">
        <player-hero
          :currentMana="playerMana"
          :isEnemyDone="doneAttack"
          :characterClass="characterClass"
        />
      </div>
      <div class="enemy">
        <enemy :message="enemyLog" :isAttacking="isEnemyAttacking" />
      </div>
      <skills-dashboard
        :skills="characterData.skills"
        :currentPlayerMana="characterData.mana"
        @process-indicators="processIndicators"
      />
      <notication-message />
    </div>
  </div>
</template>

<script>
// import { setTimeout } from 'timers';
import AccountMixin from '../shared/mixins/AccountMixin';
import HealthManaDashboard from './HealthManaDashboard.vue';
import SkillsDashboard from './SkillsDashboard.vue';
import NotificationMessage from './NotificationMessage.vue';
import Player from './Player';
import Enemy from './Enemy';
export default {
  name: 'GameScreen',
  mixins: [AccountMixin],
  data() {
    return {
      characterData: {
        name: '',
        level: 0,
        health: 100,
        mana: 100,
        skills: []
      },
      characterClass: {},
      enemyHealth: 400,
      enemyMana: 100,
      enemyLog: '',
      isEnemyAttacking: false,
      doneAttack: false,
      gameOver: '',
      playerAttacking: false
    };
  },
  props: {
    accountId: Number
  },
  created() {
    this.getAccountCharacter(this.accountId)
      .then(accountCharacterResp => {
        console.log(accountCharacterResp, 'accountCharacterResp');
        const { name, stats, level, skills } = accountCharacterResp.body;
        this.characterData.name = name;
        this.characterData.level = level;
        this.characterData.health = stats.health;
        this.characterData.mana = stats.mana;
        this.characterData.skills = skills;
      })
      .catch(accountCharacterError => {
        console.log(accountCharacterError, 'accountCharacterError');
      });
  },
  components: {
    'health-mana-dashboard': HealthManaDashboard,
    'player-hero': Player,
    enemy: Enemy,
    'skills-dashboard': SkillsDashboard,
    'notication-message': NotificationMessage
  },
  methods: {
    processIndicators: function(data) {
      if (data.type === 'R') {
        this.characterData.mana += data.cost;
      } else if (data.type === 'M') {
        this.characterData.health -= data.damage;
        this.characterData.mana -= data.cost;
      } else {
        this.enemyHealth -= data.damage;
        this.characterData.mana -= data.cost;
      }

      const enemySkill = this.selectEnemySkill();
      this.processAI(enemySkill);
    },
    selectEnemySkill: function() {
      const enemySkills = [
        { name: 'Basic Attack', damage: 35, mana: 0 },
        { name: 'Ice Breath', damage: 40, mana: 10 },
        { name: 'Swirling Wind', damage: 45, mana: 15 },
        { name: 'Molten Eruption', damage: 50, mana: 20 }
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
          this.characterData.health -= enemySkill.damage;
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
    'characterData.health': function(health) {
      if (health <= 0) {
        this.gameOver = 'You lose!';
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dungeon {
  margin: 0 auto;
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
