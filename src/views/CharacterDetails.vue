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

  components: {
    'character-dashboard': CharacterDashboard
  },
  created() {
    const accountId = this.$store.state.authentication.accountId;
    if (accountId) {
      this.$store.dispatch(GET_CHARACTER, accountId);
    }
  },
  computed: {
    details() {
      const { stats, equipment } = this.$store.state.character.details;
      const normalizedStats = normalizeStats(stats, equipment);
      const data = {
        ...this.$store.state.character.details,
        stats: { ...normalizedStats }
      };
      return data || {};
    }
  }
};
</script>
