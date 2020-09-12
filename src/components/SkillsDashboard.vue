<template>
  <div>
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
      const { cost, type } = this.currentSkill;
      if (this.currentPlayerMana >= cost) {
        EventBus.$emit('player-attacks', type === 'P');

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

<style scoped></style>
