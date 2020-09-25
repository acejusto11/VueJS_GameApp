<template>
  <div>
    <div v-if="playerAttacking" class="attackingPlayer">
      <img class="attacking" :src="getImage(type, 'attack')" />
    </div>
    <div v-else class="idlePlayer">
      <img class="idle" :src="getImage(type, 'idle')" />
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import { EventBus } from '../main';
import { getCharacterImage } from '../utils';
export default {
  name: 'Player',
  data() {
    return {
      characterImages: [],
      playerAttacking: false
    };
  },
  props: {
    type: String,
    characterClass: Object,
    currentHealth: Number,
    currentMana: Number,
    isEnemyDone: Boolean
  },
  created() {
    EventBus.$on('player-attacks', data => {
      this.playerAttacking = data;
      setTimeout(() => (this.playerAttacking = false), 2000);
    });
  },
  destroyed() {
    EventBus.$off('player-attacks');
  },
  methods: {
    setSkillButtonClass: function(id) {
      return `skillButton${id}`;
    },
    setSkillIconPath: function(skill) {
      const defaultSkillIcon = require('../assets/shuriken.jpg');
      return skill.image && this.characterClass.title
        ? require(`../assets/${this.characterClass.title}/${skill.image}`)
        : defaultSkillIcon;
    },
    getImage: function(type, action) {
      this.characterImages = getCharacterImage(this.type || 1);
      const image =
        action == 'attack' ? this.characterImages[1] : this.characterImages[0];
      console.log(this.type, 'type');
      console.log(image, 'iamge');
      return require(`../assets/${type}/${action}.png`);
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
  width: 250px;
  height: 250px;
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
