<template>
  <div>
    <div class="blinking message">{{ message }}</div>
    <div v-if="isAttacking" class="attackingPlayer">
      <img class="attacking" src="../assets/ninja.gif" />
    </div>
    <div v-else class="idlePlayer">
      <img class="idle" src="../assets/nina.png" />
    </div>
    <button class="attackButton" @click="basicAttack">
      <img class="attackIcon" src="../assets/Attack_skill_icon.png" />
    </button>
    <button
      class="skill1Button"
      @click="processSkills(1)"
      :disabled="disableSkills"
    >
      <img class="skillsIcon" src="../assets/shuriken.jpg" />
    </button>
    <div
      class="skill2Button"
      @click="processSkills(2)"
      :disabled="disableSkills"
    >
      <img class="skillsIcon" src="../assets/Fire_Burst_skill_icon.png" />
    </div>
    <div
      class="skill3Button"
      @click="processSkills(3)"
      :disabled="disableSkills"
    >
      <img class="skillsIcon" src="../assets/icon_cler_heal.png" />
    </div>
    <div class="focusButton" @click="focus" :disabled="disableSkills">
      <img class="skillsIcon" src="../assets/Arcane_Cloak_skill_icon.png" />
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'Player',
  data() {
    return {
      isAttacking: false,
      message: ''
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
      const skill = { name: 'Attack', damage: 3, mana: 0 };
      this.isAttacking = true;
      this.message = "You're using Basic Tai Jutsu";
      setTimeout(() => {
        this.$emit('process-indicators', skill);
        this.message = '';
        this.isAttacking = false;
      }, 3000);
    },
    processSkills: function(id) {
      if (this.currentMana >= 30) {
        const skill = this.skills[id - 1];
        this.isAttacking = skill.name === 'Seishin Teki Kyoyo' ? false : true;
        this.message = `You're using ${skill.name}`;
        setTimeout(() => {
          this.$emit('process-indicators', skill);
          this.message = '';
          this.isAttacking = false;
        }, 2000);
      }
    },
    focus: function() {
      const skill = { name: 'Focus', damage: 0, mana: 20 };
      this.message = `You're using ${skill.name}`;
      setTimeout(() => {
        this.$emit('process-indicators', skill);
        this.message = '';
        this.isAttacking = false;
      }, 1000);
    }
  },
  computed: {
    disableSkills: function() {
      return this.currentMana <= 30 || this.isAttacking;
    },
    disableFocus: function() {
      return this.isAttacking;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.attackingPlayer {
  position: absolute;
  bottom: 20px;
  left: 50px;
}

.idlePlayer {
  position: absolute;
  bottom: 40px;
  left: 80px;
}

.attacking {
  width: 350px;
  height: 300px;
}
.idle {
  width: 150px;
  height: 200px;
}

.skills {
  border-radius: 50%;
  border: 1px solid #2a2b18;
  background: rgb(202, 198, 198);
}

button {
  border: none;
  background: none;
  outline: none;
}

.attackButton {
  position: absolute;
  bottom: -100px;
  left: -100px;
}

.skill1Button {
  position: absolute;
  bottom: 10px;
  left: -100px;
}

.skill2Button {
  position: absolute;
  bottom: -30px;
  left: -10px;
}

.skill3Button {
  position: absolute;
  bottom: -100px;
  left: 20px;
}

.focusButton {
  position: absolute;
  bottom: 80px;
  left: -100px;
}

.skillsIcon {
  border-radius: 50%;
  cursor: pointer;
  width: 60px;
  height: 60px;
}

.attackIcon {
  border-radius: 50%;
  cursor: pointer;
  width: 90px;
  height: 90px;
}

.message {
  margin-left: 90px;
  color: white;
  font-size: 1.5rem;
}
</style>
