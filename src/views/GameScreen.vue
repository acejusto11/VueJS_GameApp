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
        <enemy :enemyDetails="enemyDetails" />
      </div>
    </div>
    <div class="bottom">
      <div class="skillsDashboard">
        <skills-dashboard
          :characterDetails="characterDetails"
          :currentPlayerMana="characterDetails.stats.mana.total"
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
      }
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
        this.currentEnemy.health -= Math.round(
          (data.damage / 100) * this.characterDetails.stats.off.total
        );
      }
      // if (data.target === 'enemy') {
      //   this.enemyData.health -= data.damage;
      //   this.characterData.mana -= data.cost;
      // } else if (data.target === 'self') {
      //   if (data.type === 'M') {
      //     this.characterData.health -= data.damage;
      //     this.characterData.mana -= data.cost;
      //   } else if (data.type === 'R') {
      //     this.characterData.mana += data.cost;
      //   }
      // }
      // const enemySkill = this.selectEnemySkill();
      // this.processAI(enemySkill);
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