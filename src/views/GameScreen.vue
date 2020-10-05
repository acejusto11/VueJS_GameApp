<template>
  <div class="dungeon" :style="{'background-image': `url(${getImage()})`}">
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
          @process-skill="processSkill"
        />
      </div>
      <div class="notification">
        <notication-message />
      </div>
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
import { ENTER_DUNGEON } from '../store/actions.type';
import { normalizeStats } from '../utils';
export default {
  name: 'GameScreen',
  components: {
    'health-mana-dashboard': HealthManaDashboard,
    'player-hero': Player,
    enemy: Enemy,
    'skills-dashboard': SkillsDashboard,
    'notication-message': NotificationMessage
  },
  data() {
    return {
      currentPlayer: {
        health: 0,
        mana: 0
      },
      currentEnemy: {
        health: 0,
        mana: 0
      },
      isEnemyAttacking: false
    };
  },
  created() {
    const dungeonId = this.$route.params.id;
    const characterId = this.$store.state.character.details._id;
    if (characterId && dungeonId) {
      this.$store
        .dispatch(ENTER_DUNGEON, { characterId, dungeonId })
        .then(() => {
          this.currentPlayer = {
            health: this.characterDetails.stats.health.total,
            mana: this.characterDetails.stats.mana.total
          };
          this.currentEnemy = {
            health: this.enemyDetails.stats.health,
            mana: this.enemyDetails.stats.mana
          };
        });
    }
  },
  computed: {
    dungeonDetails() {
      return this.$store.state.dungeon;
    },
    enemyDetails() {
      return this.$store.state.dungeon.battlefield.enemy;
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
    processSkill(data) {
      console.log('received data', data);
      if (data.target === 'enemy') {
        const damage = Math.round(
          (data.damage / 100) * this.characterDetails.stats.off.total
        );
        this.currentEnemy.health -= damage;
        this.currentPlayer.mana -= data.cost;
        this.currentPlayer.mana -= data.cost;
        this.processNotification(
          `${this.characterDetails.name} used ${data.name}. Dealt ${damage} damage`
        );
      } else {
        if (data.type === 'M') {
          const healthPts = Math.round(
            ((data.damage * -0.75) / 100) *
              this.characterDetails.stats.int.total
          );
          this.currentPlayer.health += healthPts;
          this.currentPlayer.mana -= data.cost;
          this.processNotification(
            `${this.characterDetails.name} used ${data.name}. Gained ${healthPts} health points.`
          );
        } else if (data.type === 'R') {
          const manaPts = Math.round(
            ((data.damage * 0.75) / 100) * this.characterDetails.stats.int.total
          );
          this.currentPlayer.mana += manaPts;
          this.processNotification(
            `${this.characterDetails.name} used ${data.name}. Gained ${manaPts} mana points.`
          );
        }
      }
      // const enemySkill = this.selectEnemySkill();

      // this.processAI(enemySkill);
    },
    processNotification(message) {
      EventBus.$emit('notify', message);
    },
    selectEnemySkill() {
      const randomInt = Math.floor(Math.random() * Math.floor(3));
      const skill = this.enemyDetails.skills[randomInt];
      this.isEnemyAttacking = true;
      return skill;
    },
    getImage() {
      const imageName = this.dungeonDetails.battlefield.dungeon.image;
      return require(`../assets/dungeons/${imageName}.jpg`);
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