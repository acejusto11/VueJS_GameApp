<template>
  <div class="container">
    <button @click="processAttack()">Attack</button>
    <button @click="processFocus()">Focus</button>
    <div v-for="skill in characterDetails.skills" :key="skill._id">
      <button
        @click="processSkills(skill._id)"
        :disabled="isSkillDisabled(skill.cost)"
      >{{ skill.name }}</button>
    </div>
    <button>Run Away</button>
  </div>
</template>
<script>
import { EventBus } from '../main';
export default {
  name: 'SkillsDashboard',
  data() {
    return {
      currentSkill: {}
    };
  },
  props: {
    skills: Array,
    characterDetails: Object,
    currentPlayerMana: Number
  },
  computed: {},
  methods: {
    processAttack: function() {
      this.currentSkill = {
        name: 'Attack',
        damage: 90, // % Offense
        target: 'enemy',
        cost: 0,
        type: 'P'
      };
      EventBus.$emit('player-attacks', this.currentSkill.type === 'P');
      this.$emit('process-skill', this.currentSkill);
    },
    processFocus: function() {
      this.currentSkill = {
        name: 'Focus',
        damage: 120,
        target: 'self',
        cost: 50,
        type: 'R'
      };
      this.$emit('process-skill', this.currentSkill);
    },
    processSkills: function(id) {
      this.currentSkill =
        this.characterDetails.skills &&
        this.characterDetails.skills.find(function(skill) {
          return skill._id == id;
        });
      const { cost, target } = this.currentSkill;
      if (this.currentPlayerMana >= cost) {
        EventBus.$emit('player-attacks', target === 'enemy');
        this.$emit('process-skill', this.currentSkill);
      }
    },
    isSkillDisabled(cost) {
      return cost > this.currentPlayerMana;
    }
  }
};
</script>

<style scoped>
button {
  background-color: #44c767;
  border-radius: 23px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: black;
  font-family: Arial;
  font-size: 1rem;
  font-weight: 500;
  padding: 5px 27px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
  margin: 2px;
  width: 180px;
}
button:hover {
  background-color: #5cbf2a;
}
button:active {
  position: relative;
  top: 1px;
}
button:disabled {
  background: gray;
  cursor: not-allowed;
}

.container {
  background-color: rgb(3 0 0 / 70%);
  border: 10px solid rgb(3 2 2 / 50%);
  padding: 1rem;
}
</style>
