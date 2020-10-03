<template>
  <div class="dungeon" :style="{'background-image': `url(${getImage()})`}">
    <health-mana-dashboard :characterDetails="characterDetails" :enemyDetails="enemyDetails" />
  </div>
</template>
<script>
import HealthManaDashboard from '../components/HealthManaDashboard.vue';
import { ENTER_DUNGEON } from '../store/actions.type';
import { normalizeStats } from '../utils';
export default {
  name: 'GameScreen',
  components: {
    'health-mana-dashboard': HealthManaDashboard
  },
  data() {
    return {};
  },
  created() {
    const dungeonId = this.$route.params.id;
    const characterId = this.$store.state.character.details._id;
    if (characterId && dungeonId) {
      this.$store.dispatch(ENTER_DUNGEON, { characterId, dungeonId });
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
</style>