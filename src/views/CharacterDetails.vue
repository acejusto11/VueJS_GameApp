<template>
  <div class="main">
    <character-dashboard :details="details" />
  </div>
</template>

<script>
import { GET_CHARACTER } from '../store/actions.type';
import CharacterDashboard from '../components/CharacterDashboard.vue';
import { normalizeStats } from '../utils';
export default {
  name: 'CharacterDetails',
  data() {
    return {
      stats: {}
    };
  },
  components: {
    'character-dashboard': CharacterDashboard
  },
  mounted() {
    const accountId = this.$store.state.authentication.accountId;
    const stats = this.$store.state.character.details.stats;
    const equipment = this.$store.state.character.details.equipment;
    this.stats = normalizeStats(stats, equipment);
    console.log(this.stats, 'stats');
    if (accountId) {
      this.$store.dispatch(GET_CHARACTER, accountId);
    }
  },
  computed: {
    details() {
      const data = {
        ...this.$store.state.character.details,
        stats: { ...this.stats }
      };
      return data;
    }
  }
};
</script>
