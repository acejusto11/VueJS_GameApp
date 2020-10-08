<template>
  <div class="dungeon" :style="{ 'background-image': `url(${getImage()})` }">
    <health-mana-dashboard
      :characterDetails="characterDetails"
      :enemyDetails="enemyDetails"
      :currentPlayerStats="currentPlayer"
      :currentEnemyStats="currentEnemy"
    />
    <div>
      <div class="player">
        <player-hero :type="characterDetails.classType" />
      </div>
      <div class="enemy">
        <enemy :enemyDetails="enemyDetails" :isAttacking="isEnemyAttacking" />
      </div>
    </div>
    <div class="bottom">
      <div class="skillsDashboard">
        <skills-dashboard
          :characterDetails="characterDetails"
          :currentPlayerMana="currentPlayer.mana"
          :closeCallback="closeBattleResults"
          @process-skill="processSkill"
        />
      </div>
      <div class="notification">
        <notication-message />
      </div>
      <battle-results
        v-if="showBattleresults"
        :battleResults="battleResults"
        :closeCallback="closeBattleResults"
      />
      <reenter-dungeon
        v-if="showReenterDungeon"
        :yesCallback="reEnterDungeon"
        :noCallback="exitDungeon"
      />
    </div>
  </div>
</template>
<script>
import { EventBus } from '../main';
import HealthManaDashboard from '../components/HealthManaDashboard.vue';
import NotificationMessage from '../components/NotificationMessage.vue';
import Player from '../components/Player';
import Enemy from '../components/Enemy';
import SkillsDashboard from '../components/SkillsDashboard.vue';
import BattleResults from '../components/BattleResults.vue';
import ReenterDungeon from '../components/ReenterDungeon.vue';
import {
  ENTER_DUNGEON,
  GET_CHARACTER,
  SAVE_BATTLE
} from '../store/actions.type';
import { normalizeStats } from '../utils';
import { setTimeout } from 'timers';
export default {
  name: 'GameScreen',
  components: {
    'health-mana-dashboard': HealthManaDashboard,
    'player-hero': Player,
    enemy: Enemy,
    'skills-dashboard': SkillsDashboard,
    'notication-message': NotificationMessage,
    'battle-results': BattleResults,
    'reenter-dungeon': ReenterDungeon
  },
  data() {
    return {
      playing: true,
      currentPlayer: {
        health: 0,
        mana: 0
      },
      currentEnemy: {
        health: 0,
        mana: 0
      },
      isEnemyAttacking: false,
      showBattleresults: false,
      showReenterDungeon: false,
      battleResults: {}
    };
  },
  created() {
    const dungeonId = this.$route.params.id;
    const characterId = this.$session.get('characterId');
    const accountId = this.$session.get('accountId');
    if (characterId && dungeonId) {
      this.$store
        .dispatch(ENTER_DUNGEON, { characterId, dungeonId })
        .then(() => {
          this.$store.dispatch(GET_CHARACTER, accountId).then(() => {
            this.currentPlayer = {
              health: this.characterDetails.stats.health.total,
              mana: this.characterDetails.stats.mana.total
            };
            this.currentEnemy = {
              health: this.enemyDetails.stats.health,
              mana: this.enemyDetails.stats.mana
            };
          });
        });
    }
  },
  computed: {
    dungeonDetails() {
      return this.$store.state.dungeon;
    },
    enemyDetails() {
      return (
        this.$store.state.dungeon.battlefield &&
        this.$store.state.dungeon.battlefield.enemy
      );
    },
    characterDetails() {
      const { stats, equipment } = this.$store.state.character.details;
      const normalizedStats = normalizeStats(stats, equipment);
      const data = {
        ...this.$store.state.character.details,
        stats: { ...normalizedStats }
      };
      return data || {};
    }
  },
  methods: {
    processSkill(skill) {
      if (!this.playing) return;
      if (skill.target === 'enemy') {
        const damage = Math.round(
          (skill.damage / 100) * this.characterDetails.stats.off.total
        );
        this.currentEnemy.health -= damage;
        this.currentPlayer.mana -= skill.cost;
        this.processNotification(
          `${this.characterDetails.name} used ${skill.name}. Dealt ${damage} damage`
        );
      } else {
        if (skill.type === 'M') {
          const healthPts = Math.round(
            ((skill.damage * -0.75) / 100) *
              this.characterDetails.stats.int.total
          );
          this.currentPlayer.health += healthPts;
          this.currentPlayer.mana -= skill.cost;
          this.processNotification(
            `${this.characterDetails.name} used ${skill.name}. Gained ${healthPts} health points.`
          );
        } else if (skill.type === 'R') {
          const manaPts = Math.round(
            ((skill.damage * 0.75) / 100) *
              this.characterDetails.stats.int.total
          );
          this.currentPlayer.mana += manaPts;
          this.processNotification(
            `${this.characterDetails.name} used ${skill.name}. Gained ${manaPts} mana points.`
          );
        }
      }
      const enemySkill = this.selectEnemySkill();
      setTimeout(() => {
        this.processAI(enemySkill);
      }, 2000);
    },
    processAI: function(skill) {
      console.log(skill, 'enemySkill');
      if (!this.playing) return;
      if (skill.target === 'enemy') {
        const damage = Math.round(
          (skill.damage / 100) * 30 // Fixed offense value
        );
        const reducedDamage =
          damage -
          Math.round((this.characterDetails.stats.def.total * 10) / 100);
        this.currentPlayer.health -= reducedDamage;
        this.currentEnemy.mana -= skill.cost;
        this.processNotification(
          `${this.enemyDetails.name} used ${skill.name}. Dealt ${damage} damage`
        );
      }
    },
    processNotification(message) {
      EventBus.$emit('notify', message);
    },
    selectEnemySkill() {
      console.log(this.enemyDetails.skills, 'this.enemyDetails.skills');
      const skillLength =
        this.enemyDetails.skills && this.enemyDetails.skills.length;
      const randomInt = Math.floor(Math.random() * Math.floor(skillLength));
      const skill = this.enemyDetails.skills[randomInt];
      this.isEnemyAttacking = true;
      return skill;
    },
    getImage() {
      const imageName =
        this.dungeonDetails.battlefield &&
        this.dungeonDetails.battlefield.dungeon.image;
      return imageName ? require(`../assets/dungeons/${imageName}.jpg`) : '';
    },
    closeBattleResults() {
      this.showBattleresults = false;
      this.showReenterDungeon = true;
    },
    reEnterDungeon() {
      this.$router.go(0);
    },
    exitDungeon() {
      this.$router.push({
        name: 'dungeons'
      });
    }
  },
  watch: {
    'currentEnemy.health': function(health) {
      if (health <= 0) {
        this.processNotification('You win');
        const dungeonId = this.$route.params.id;
        const characterId = this.characterDetails._id;
        const enemyId = this.enemyDetails._id;
        this.playing = false;
        this.$store
          .dispatch(SAVE_BATTLE, { characterId, dungeonId, enemyId })
          .then(result => {
            this.showBattleresults = true;
            this.battleResults = result;
          });
      }
    },
    'currentPlayer.health': function(health) {
      if (health <= 0) {
        this.playing = false;
        this.processNotification('You lose');
        this.closeBattleResults();
      }
    }
  }
};
</script>
<style scoped>
.dungeon {
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.1);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
}
.player {
  position: absolute;
  bottom: 150px;
  left: 180px;
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
</style>
