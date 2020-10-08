<template>
  <div class="dungeon">
    <health-mana-dashboard
      :characterStats="characterStats"
      :characterData="characterData"
      :monsterStats="monsterStats"
      :enemyData="enemyData"
      :playerName="characterData.name"
      :playerLevel="characterData.level"
      :currentPlayerHealth="characterData.health"
      :currentPlayerMana="characterData.mana"
      :currentEnemyHealth="enemyData.health"
      :currentEnemyMana="enemyData.mana"
    />
    <div class="gameOver">{{ gameOver }}</div>
    <div v-if="!gameOver">
      <div class="player">
        <player-hero
          :type="characterData.type"
          :currentMana="playerMana"
          :isEnemyDone="doneAttack"
        />
      </div>
      <div class="enemy">
        <enemy :isAttacking="isEnemyAttacking" />
      </div>
      <div class="bottom">
        <div class="skillsDashboard">
          <skills-dashboard
            :skills="characterData.skills"
            :currentPlayerMana="characterData.mana"
            @process-indicators="processIndicators"
          />
        </div>
        <div class="notification">
          <notication-message />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../main';
import AccountMixin from '../shared/mixins/AccountMixin';
import HealthManaDashboard from '../components/HealthManaDashboard.vue';
import SkillsDashboard from '../components/SkillsDashboard.vue';
import NotificationMessage from '../components/NotificationMessage.vue';
import Player from '../components/Player';
import Enemy from '../components/Enemy';
export default {
  name: 'GameScreen2',
  mixins: [AccountMixin],
  data() {
    return {
      characterData: {
        name: '',
        level: 0,
        health: 100,
        mana: 100,
        type: 1,
        skills: []
      },
      characterStats: {},
      monsterStats: {
        health: 400,
        mana: 400
      },
      enemyData: {
        name: 'Viserion',
        level: 1,
        health: 400,
        mana: 400,
        skills: [
          { name: 'Basic Attack', damage: 35, mana: 0 },
          { name: 'Ice Breath', damage: 40, mana: 10 },
          { name: 'Swirling Wind', damage: 45, mana: 15 },
          { name: 'Molten Eruption', damage: 50, mana: 20 }
        ]
      },
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
        const {
          classType,
          name,
          stats,
          level,
          skills
        } = accountCharacterResp.body;
        this.characterData.name = name;
        this.characterData.level = level;
        this.characterData.type = classType;
        this.characterData.health = stats.health;
        this.characterData.mana = stats.mana;
        this.characterData.skills = skills;
        this.characterStats = stats;
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
      if (data.target === 'enemy') {
        this.enemyData.health -= data.damage;
        this.characterData.mana -= data.cost;
      } else if (data.target === 'self') {
        if (data.type === 'M') {
          this.characterData.health -= data.damage;
          this.characterData.mana -= data.cost;
        } else if (data.type === 'R') {
          this.characterData.mana += data.cost;
        }
      }
      const enemySkill = this.selectEnemySkill();
      this.processAI(enemySkill);
    },
    selectEnemySkill: function() {
      const randomInt = Math.floor(Math.random() * Math.floor(3));
      const skill = this.enemyData.skills[randomInt];
      this.isEnemyAttacking = true;
      return skill;
    },
    processAI: function(enemySkill) {
      if (this.enemyData.mana <= 20)
        enemySkill = { name: 'Rejuvenate', damage: 0, mana: 20 };
      const message = `Viserion is using ${enemySkill.name}`;
      EventBus.$emit('notify', message);

      setTimeout(() => {
        if (this.enemyData.mana <= 20) {
          this.enemyData.mana += enemySkill.mana;
        } else {
          this.characterData.health -= enemySkill.damage;
          this.enemyData.mana -= enemySkill.mana;
        }
        this.doneAttack = true;
        this.isEnemyAttacking = false;
      }, 3000);
    }
  },
  watch: {
    'enemyData.health': function(health) {
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

.bottom {
  display: flex;
  position: absolute;
  bottom: 0px;
}

.gameOver {
  color: white;
  font-size: 5rem;
  padding: 2rem;
}
</style>
