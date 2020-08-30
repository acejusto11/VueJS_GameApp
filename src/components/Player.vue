<template>
  <div>
    HERO
    <div class="blinking">{{message}}</div>
    <div>
      <button @click="basicAttack()" :disabled="disableSkills">Attack</button>
      <button @click="processSkills(1)" :disabled="disableSkills">Skill 1</button>
      <button @click="processSkills(2)" :disabled="disableSkills">Skill 2</button>
      <button @click="processSkills(3)" :disabled="disableSkills">Skill 3</button>
      <button @click="focus" :disabled="disableFocus">Focus</button>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "Player",
  data() {
    return {
      isAttacking: false,
      message: ""
    };
  },
  props: {
    skills: Array,
    currentHealth: Number,
    currentMana: Number,
    isEnemyDone: Boolean
  },
  methods: {
    basicAttack: function() {
      const skill = { name: "Attack", damage: 3, mana: 0 };
      this.isAttacking = true;
      this.message = "You're using Basic Tai Jutsu";
      setTimeout(() => {
        this.$emit("process-indicators", skill);
        this.message = "";
      }, 3000);
    },
    processSkills: function(id) {
      this.isAttacking = true;
      const skill = this.skills[id - 1];
      this.message = `You're using ${skill.name}`;
      setTimeout(() => {
        this.$emit("process-indicators", skill);
        this.message = "";
      }, 2000);
    },
    focus: function() {
      const skill = { name: "Focus", damage: 0, mana: 20 };
      this.isAttacking = true;
      this.message = `You're using ${skill.name}`;
      setTimeout(() => {
        this.$emit("process-indicators", skill);
        this.message = "";
      }, 2000);
    }
  },
  computed: {
    disableSkills: function() {
      return this.currentMana <= 0 || (this.isAttacking && !this.isEnemyDone);
    },
    disableFocus: function() {
      return this.isAttacking && !this.isEnemyDone;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
