<template>
  <div>
    <div>
      <health-mana-dashboard
        :playerHealth="playerHealth"
        :enemyHealth="enemyHealth"
        :playerMana="playerMana"
        :enemyMana="enemyMana"
      />
    </div>
    <div class="player">
      <player-hero
        :skills="playerSkills"
        :currentMana="playerMana"
        :isEnemyDone="doneAttack"
        @process-indicators="processIndicators"
      />
    </div>
    <div class="enemy">
      <enemy :message="enemyLog" :isAttacking="isEnemyAttacking" />
    </div>
    <div />
  </div>
</template>

<script>
import HealthManaDashboard from "./HealthManaDashboard.vue";
import Player from "./Player";
import Enemy from "./Enemy";
import { setTimeout } from "timers";
export default {
  name: "MainScreen",
  data() {
    return {
      playerHealth: 100,
      enemyHealth: 100,
      playerMana: 100,
      enemyMana: 100,
      playerSkills: [
        { name: "Shurikenjutsu", damage: 5, mana: 20 },
        { name: "Suiton No Jutsu", damage: 10, mana: 40 },
        { name: "Seishin Teki Kyoyo", health: 10, mana: 10 }
      ],
      enemyLog: "",
      isEnemyAttacking: false,
      doneAttack: false
    };
  },
  components: {
    "health-mana-dashboard": HealthManaDashboard,
    "player-hero": Player,
    enemy: Enemy
  },
  methods: {
    processIndicators: function(data) {
      if (data.name === "Focus") {
        this.playerMana += data.mana;
      } else if (data.name === "Seishin Teki Kyoyo") {
        this.playerHealth += data.health;
        this.playerMana -= data.mana;
      } else {
        this.enemyHealth -= data.damage;
        this.playerMana -= data.mana;
      }

      const enemySkill = this.selectEnemySkill();
      this.processAI(enemySkill);
    },
    selectEnemySkill: function() {
      const enemySkills = [
        { name: "Kick Ass", damage: 10, mana: 10 },
        { name: "Punch Ass", damage: 10, mana: 15 },
        { name: "Slash Ass", damage: 15, mana: 20 }
      ];
      const randomInt = Math.floor(Math.random() * Math.floor(3));
      const skill = enemySkills[randomInt];
      console.log("AI skill to use", skill);
      this.enemyLog = `Viserion is using ${skill.name}`;
      this.isEnemyAttacking = true;
      return skill;
    },
    processAI: function(enemySkill) {
      setTimeout(() => {
        this.playerHealth -= enemySkill.damage;
        this.enemyMana -= enemySkill.mana;
        this.doneAttack = true;
        this.isEnemyAttacking = false;
        this.enemyLog = "";
      }, 3000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player {
  position: absolute;
  bottom: 150px;
  left: 150px;
}

.enemy {
  position: absolute;
  bottom: 150px;
  right: 150px;
}
</style>
