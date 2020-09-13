<template>
  <div class="container">
    <button @click="processAttack()">Attack</button>
    <button @click="processFocus()">Focus</button>
    <div v-for="skill in skills" :key="skill._id">
      <button @click="processSkills(skill._id)">{{ skill.name }}</button>
    </div>
  </div>
</template>
<script>
import { EventBus } from '../main';
import { setTimeout } from 'timers';
export default {
  name: 'SkillsDashboard',
  data() {
    return {
      currentSkill: {}
    };
  },
  props: {
    skills: Array,
    currentPlayerMana: Number
  },
  methods: {
    processAttack: function() {
      this.currentSkill = {
        name: 'Attack',
        damage: 20,
        target: 'enemy',
        cost: 0,
        type: 'P'
      };
      EventBus.$emit('player-attacks', this.currentSkill.type === 'P');
      this.processNotification();
      setTimeout(
        () => this.$emit('process-indicators', this.currentSkill),
        2000
      );
    },
    processFocus: function() {
      this.currentSkill = {
        name: 'Focus',
        damage: 0,
        target: 'self',
        cost: 50,
        type: 'R'
      };
      this.processNotification();
      setTimeout(
        () => this.$emit('process-indicators', this.currentSkill),
        2000
      );
    },
    processSkills: function(id) {
      this.currentSkill =
        this.skills &&
        this.skills.find(function(skill) {
          return skill._id == id;
        });
      const { cost, target } = this.currentSkill;
      if (this.currentPlayerMana >= cost) {
        EventBus.$emit('player-attacks', target === 'enemy');

        this.processNotification();
        setTimeout(
          () => this.$emit('process-indicators', this.currentSkill),
          2000
        );
      }
    },
    processNotification: function() {
      const { name } = this.currentSkill;
      const message = `You are using ${name}`;
      EventBus.$emit('notify', message);
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
  min-width: 150px;
}
button:hover {
  background-color: #5cbf2a;
}
button:active {
  position: relative;
  top: 1px;
}

.container {
  background-color: rgb(3 0 0 / 70%);
  border: 10px solid rgb(3 2 2 / 50%);
  padding: 1rem;
}
</style>
