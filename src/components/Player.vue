<template>
  <div>
    <div class="blinking message">{{ message }}</div>
    <div v-if="isAttacking" class="attackingPlayer">
      <img class="attacking" src="../assets/ninja.gif" />
    </div>
    <div v-else class="idlePlayer">
      <img class="idle" src="../assets/idleNinja.png" />
    </div>
    <button class="attackButton" @click="basicAttack">
      <img class="attackIcon" src="../assets/Attack_skill_icon.png" />
    </button>
    <div v-for="skill in skills" :key="skill.id">
      <button
        :class="setSkillButtonClass(skill.id)"
        @click="processSkills(skill.id)"
        :disabled="disableSkills"
      >
        <img class="skillsIcon" :src="setSkillIconPath(skill)" />
      </button>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import { getCharacterImage } from '../utils';
export default {
  name: 'Player',
  data() {
    return {
      isAttacking: false,
      message: '',
      characterImages: []
    };
  },
  props: {
    skills: Array,
    characterClass: Object,
    currentHealth: Number,
    currentMana: Number,
    isEnemyDone: Boolean
  },
  mounted() {},
  methods: {
    basicAttack: function() {
      const skill = { name: 'Attack', damage: 3, mana: 0 };
      this.isAttacking = true;
      this.message = "You're using Basic Attack";
      setTimeout(() => {
        this.$emit('process-indicators', skill);
        this.message = '';
        this.isAttacking = false;
      }, 3000);
    },
    processSkills: function(id) {
      const skill = this.skills[id - 1];
      if (this.currentMana >= skill.mana) {
        if (skill.type === 'damage') {
          this.isAttacking = skill.type === 'damage' ? true : false;
          this.message = `You're using ${skill.name}`;
          setTimeout(() => {
            this.$emit('process-indicators', skill);
            this.message = '';
            this.isAttacking = false;
          }, 2000);
        } else {
          this.message = `You're using ${skill.name}`;
          setTimeout(() => {
            this.$emit('process-indicators', skill);
            this.message = '';
          }, 2000);
        }
      } else {
        if (skill.type === 'regenerateMana') {
          this.message = `You're using ${skill.name}`;
          setTimeout(() => {
            this.$emit('process-indicators', skill);
            this.message = '';
          }, 2000);
        }
      }
    },
    setSkillButtonClass: function(id) {
      return `skillButton${id}`;
    },
    setSkillIconPath: function(skill) {
      const defaultSkillIcon = require('../assets/shuriken.jpg');
      return skill.image && this.characterClass.title
        ? require(`../assets/${this.characterClass.title}/${skill.image}`)
        : defaultSkillIcon;
    },
    setIdleImage: function() {
      this.characterImages = getCharacterImage(this.characterClass.code);
      return this.characterImages
        ? require(`../assets/${this.characterClass.title}/${this.characterImages[1]}`)
        : require('../assets/idleNinja.png');
    }
  },
  computed: {
    disableSkills: function() {
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
button:focus {
  outline: none;
}

.attackButton {
  position: absolute;
  bottom: -100px;
  left: -100px;
}

.skillButton1 {
  position: absolute;
  bottom: 10px;
  left: -100px;
}

.skillButton2 {
  position: absolute;
  bottom: -30px;
  left: -10px;
}

.skillButton3 {
  position: absolute;
  bottom: -100px;
  left: 20px;
}

.skillButton4 {
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
